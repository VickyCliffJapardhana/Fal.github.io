---
title: 'Modern OCR: Complete Guide to Optical Character Recognition with AI and Web Integration'
description: 'A practical overview of OCR, how it works, key tools, challenges, and real-world use cases.'
pubDate: 'Feb 25 2026'
heroImage: '../../assets/ocr.png'
---

OCR (Optical Character Recognition) is a technology that enables computers to read text from images or scanned documents.

Example use cases:

- Scanning ID cards
- Scanning shopping receipts
- Scanning PDF documents
- Detecting vehicle license plate numbers

## How It Works

In general, the process includes:

1. Image preprocessing
2. Grayscale conversion
3. Noise reduction
4. Thresholding
5. Text detection
6. Character segmentation
7. Pattern recognition (ML / AI)

## Tools & Libraries

1. Tesseract OCR  
   Plus points:
   - Open source
   - Uses LSTM (Long Short-Term Memory)
   - Supports output formats (PDF, HOCR/HTML, etc.)
   - Multi-language support

2. Google Vision API
   - Handles complex document formats
   - Cloud-based AI
   - Supports handwriting recognition

3. OpenAI Vision / Modern AI OCR
   - Reads text
   - Understands context
   - Extracts structured data

## Challenges

- Handwriting is difficult to detect accurately
- Blurry or unclear images
- Poor lighting conditions
- Complex layouts

## Real-World Use Cases

- e-KYC (identity verification)
- Automated ID card scanning
- POS systems for receipt scanning
- Archive digitalization

## Implementation Code Snippets

### 1. OCR Engine Service

```ts
// ocr-engine.service.ts
import { Injectable } from '@angular/core';
import { createWorker, Worker } from 'tesseract.js';

export interface OCRWord {
  text: string;
  confidence: number;
  bbox: { x0: number; y0: number; x1: number; y1: number };
}

export interface OCRResult {
  text: string;
  confidence: number;
  words: OCRWord[];
}

@Injectable({ providedIn: 'root' })
export class OcrEngineService {

  private workers: Worker[] = [];
  private queue: (() => Promise<void>)[] = [];
  private activeJobs = 0;
  private maxWorkers = navigator.hardwareConcurrency || 4;
  private initialized = false;

  async init(lang: string = 'eng') {
    if (this.initialized) return;

    for (let i = 0; i < this.maxWorkers; i++) {
      const worker = await createWorker({
        logger: () => {}
      });

      await worker.loadLanguage(lang);
      await worker.initialize(lang);

      await worker.setParameters({
        tessedit_pageseg_mode: '1', // Automatic page segmentation
        tessedit_char_whitelist:
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,:-/# '
      });

      this.workers.push(worker);
    }

    this.initialized = true;
  }

  async recognize(canvas: HTMLCanvasElement): Promise<OCRResult> {
    return new Promise((resolve, reject) => {
      const job = async () => {
        try {
          const worker = this.getAvailableWorker();
          const { data } = await worker.recognize(canvas);

          const words: OCRWord[] = data.words.map((w: any) => ({
            text: w.text,
            confidence: w.confidence,
            bbox: w.bbox
          }));

          resolve({
            text: data.text,
            confidence: data.confidence,
            words
          });
        } catch (e) {
          reject(e);
        } finally {
          this.activeJobs--;
          this.processQueue();
        }
      };

      this.queue.push(job);
      this.processQueue();
    });
  }

  private getAvailableWorker(): Worker {
    this.activeJobs++;
    return this.workers[this.activeJobs % this.workers.length];
  }

  private processQueue() {
    if (this.activeJobs >= this.maxWorkers) return;
    const next = this.queue.shift();
    if (next) next();
  }

  async terminate() {
    for (const worker of this.workers) {
      await worker.terminate();
    }
    this.workers = [];
    this.initialized = false;
  }
}
```

### 2. Region of Interest (ROI)

```ts
// roi-preprocess.service.ts
extractRegion(
  source: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
): HTMLCanvasElement {

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(source, x, y, width, height, 0, 0, width, height);

  return canvas;
}
```

### 3. Confidence Filtering Layer

```ts
filterLowConfidence(words: OCRWord[], threshold = 70): OCRWord[] {
  return words.filter(w => w.confidence >= threshold);
}
```

### 4. Layout-Aware Parsing

```ts
extractTotalByLayout(words: OCRWord[]): number | null {

  const totalLabel = words.find(w =>
    w.text.toLowerCase() === 'total'
  );

  if (!totalLabel) return null;

  const candidates = words.filter(w =>
    w.bbox.y0 >= totalLabel.bbox.y0 - 5 &&
    w.bbox.y1 <= totalLabel.bbox.y1 + 5 &&
    w.bbox.x0 > totalLabel.bbox.x1
  );

  const valueWord = candidates.find(w =>
    /\d+/.test(w.text)
  );

  if (!valueWord) return null;

  return Number(valueWord.text.replace(/[^\d]/g, ''));
}
```

### 5. Cancellation Support (Abort Controller Pattern)

```ts
private currentAbort?: AbortController;

async recognizeWithCancel(canvas: HTMLCanvasElement) {
  this.currentAbort = new AbortController();

  const worker = this.getAvailableWorker();

  const result = await worker.recognize(canvas, {
    signal: this.currentAbort.signal
  });

  return result;
}

cancel() {
  this.currentAbort?.abort();
}
```

### 6. Observability & Metrics

```ts
const start = performance.now();
const result = await this.recognize(canvas);
const duration = performance.now() - start;

console.log({
  duration,
  confidence: result.confidence,
  wordCount: result.words.length
});
```
