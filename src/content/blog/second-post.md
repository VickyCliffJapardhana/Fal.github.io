---
title: 'Pengalaman Mengerjakan Proyek Angular, Angular Signals, dan Vercel'
description: 'Catatan pengalaman pribadi menggunakan Angular, Angular Signals, dan Vercel—tantangan, solusi, dan pembelajaran yang saya dapatkan.'
pubDate: 'Feb 05 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

Setelah menyelesaikan proyek sebelumnya, saya lanjut mengerjakan proyek lain yang menggunakan Angular sebagai framework utama, Angular Signals untuk state reactivity, dan Vercel untuk deployment. Kombinasi ini memberi saya alur kerja yang rapi dari pengembangan sampai rilis.

## Ringkasan Proyek

Aplikasi ini fokus pada UI yang konsisten dan interaksi yang terasa cepat. Angular memberi struktur yang jelas untuk skala tim, Signals memberi cara reaktif yang lebih sederhana dibanding pendekatan state sebelumnya, dan Vercel memudahkan preview serta deployment di tiap perubahan.

## Pengalaman dengan Angular

Angular sangat membantu dari sisi struktur proyek dan konvensi. Hal yang paling terasa:

- Modularitas membuat fitur lebih mudah dipisah dan diuji.
- Standar linting dan konfigurasi membantu konsistensi tim.
- Routing dan dependency injection terasa solid untuk aplikasi skala menengah.

Tantangan terbesar saya adalah menjaga kompleksitas modul agar tidak terlalu berat saat fitur bertambah.

## Pengalaman dengan Angular Signals

Signals memberi reaktivitas yang lebih intuitif untuk state lokal dan turunan. Dampak positif yang saya rasakan:

- State berubah lebih mudah dilacak karena sifatnya deklaratif.
- Performa lebih stabil saat komponen makin kompleks.
- Lebih sedikit boilerplate dibanding pendekatan observable tradisional.

Saya belajar untuk memilih Signals pada state yang sering berubah dan tetap menjaga struktur agar tidak menjadi “state spaghetti”.

## Pengalaman dengan Vercel

Vercel sangat membantu untuk alur deploy dan preview. Hal yang paling berguna:

- Preview URL untuk setiap pull request memudahkan review.
- Integrasi dengan git membuat rilis terasa mulus.
- Konfigurasi build relatif sederhana dan mudah dipelihara.

Tantangannya adalah menyesuaikan environment variables agar konsisten antara local, preview, dan production.

## Tantangan Utama yang Saya Hadapi

- Menyeimbangkan struktur modul Angular agar tetap ringan.
- Menentukan batas penggunaan Signals vs state management lain.
- Menjaga konfigurasi deployment Vercel tetap aman dan teratur.

Setiap tantangan ini memberi saya pemahaman lebih tentang desain arsitektur frontend yang stabil.

## Pelajaran dan Praktik yang Saya Bawa Pulang

- Mulai dari struktur modul yang sederhana dan berkembang secara bertahap.
- Gunakan Angular Signals untuk state yang jelas dan terukur.
- Manfaatkan preview Vercel untuk percepat feedback tim.
- Dokumentasikan alur deploy agar tidak membingungkan anggota baru.

## Penutup

Proyek ini memperkuat keyakinan saya bahwa Angular sangat cocok untuk aplikasi yang butuh struktur kuat, sementara Signals mempercepat reaktivitas, dan Vercel mempermudah rilis. Dengan disiplin yang konsisten, kombinasi ini bisa menghasilkan aplikasi yang cepat, stabil, dan mudah dirawat.
