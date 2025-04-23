'use client';

import { useEffect } from 'react';
import { addYears, formatISO } from 'date-fns';

export default function JobPosting() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'job-posting-schema';
    
    // Format dates consistently using date-fns
    const now = new Date();
    const datePosted = formatISO(now);
    const validThrough = formatISO(addYears(now, 1));
    
    const jobPostingSchema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "チャットレディ募集",
      "description": "福岡エリアでチャットレディを募集しています。高収入、未経験歓迎、自由なスケジュールで働けます。",
      "datePosted": datePosted,
      "validThrough": validThrough,
      "employmentType": "PART_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "福岡チャットレディ",
        "sameAs": "https://example.com",
        "logo": "https://example.com/logo.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "福岡",
          "addressRegion": "福岡県",
          "addressCountry": "JP"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "JPY",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": 300000,
          "maxValue": 1000000,
          "unitText": "MONTH"
        }
      }
    };

    script.textContent = JSON.stringify(jobPostingSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('job-posting-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}