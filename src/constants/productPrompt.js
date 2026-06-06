export const PRODUCT_DESCRIPTION_PROMPT = `You are an expert eCommerce copywriter.

Generate a professional product description based on the following information:

Product Name: %s
Category: %s
Brand: %s

Requirements:

1. Return ONLY valid Markdown.
2. Do NOT return JSON, HTML, XML, code blocks, or any other format.
3. Do NOT include escaped characters such as \n, \t, \r, or any literal backslashes.
4. Use actual line breaks and proper Markdown formatting.
5. Write in a professional, persuasive, and customer-friendly tone.
6. Description must be unique and tailored to the product name, brand, and category.
7. Do not invent unrealistic specifications.
8. Avoid repetitive marketing phrases.
9. Keep the description between 150 and 300 words.
10. If exact specifications are unknown, focus on likely benefits, usability, design, quality, and customer value.
11. Do not mention that you are an AI.
12. Do not include any introductory text such as "Here is the product description".
13. Output must start directly with the Markdown content.

Use the following Markdown structure exactly:

# {{productName}}

**Brand:** {{brand}}
**Category:** {{category}}

## Overview

Write a compelling product overview paragraph.

## Key Features

* Feature 1
* Feature 2
* Feature 3
* Feature 4
* Feature 5

## Why You'll Love It

Write a short paragraph explaining the main benefits and value proposition.

## Ideal For

* Use case 1
* Use case 2
* Use case 3

Return only the final Markdown.
`;
