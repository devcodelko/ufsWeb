import { query } from '../config/db.js';
import pool from '../config/db.js';

async function getCategoryId(slug) {
  const rows = await query('SELECT id FROM blog_categories WHERE slug = :slug LIMIT 1', { slug });
  return rows[0]?.id || null;
}

const blogs = [
  {
    title: 'Home Loan Basics: Everything Beginners Should Know',
    slug: 'home-loan-basics-for-beginners',
    category_slug: 'loans',
    tag: 'Loans',
    status: 'published',
    published_at: '2025-06-10 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&w=1200',
    excerpt: 'Dreaming of owning your own home? A home loan can make it possible. Here are the basics every first-time borrower must understand before applying.',
    content: `<h2>What Is a Home Loan?</h2><p>A home loan (also called a housing loan or mortgage) is a secured loan where the bank lends you money to buy or construct a house. The property itself acts as collateral until the loan is fully repaid.</p><h2>Key Terms You Must Know</h2><ul><li><strong>Principal:</strong> The actual loan amount borrowed</li><li><strong>Interest Rate:</strong> Cost of borrowing (fixed or floating)</li><li><strong>EMI:</strong> Equated Monthly Instalment — your monthly repayment</li><li><strong>Tenure:</strong> Loan repayment period (up to 30 years)</li><li><strong>LTV Ratio:</strong> Loan-to-Value — banks typically fund 75–90% of property value</li></ul><h2>Eligibility Criteria</h2><ul><li>Age: 21 to 65 years</li><li>Stable income (salaried or self-employed)</li><li>Good credit score (700+)</li><li>Property must have clear legal title</li></ul><h2>Documents Required</h2><ul><li>Identity and address proof (Aadhaar, PAN)</li><li>Income proof (salary slips, ITR)</li><li>Bank statements (last 6 months)</li><li>Property documents</li></ul><h2>Home Loan Tax Benefits</h2><p>Home loans come with significant tax benefits under the Income Tax Act:</p><ul><li><strong>Section 80C:</strong> Deduction up to ₹1.5 lakh on principal repayment</li><li><strong>Section 24(b):</strong> Deduction up to ₹2 lakh on interest paid</li></ul><h2>Tips for First-Time Borrowers</h2><ol><li>Compare interest rates from at least 3 lenders</li><li>Choose floating rate if rates are expected to fall</li><li>Make a larger down payment to reduce EMI burden</li><li>Avoid taking other loans while repaying a home loan</li></ol>`
  },
  {
    title: 'NEFT, RTGS and IMPS: Understanding Money Transfers',
    slug: 'neft-rtgs-imps-money-transfer',
    category_slug: 'payments',
    tag: 'Payments',
    status: 'published',
    published_at: '2025-06-12 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&w=1200',
    excerpt: 'NEFT, RTGS, IMPS — three ways to transfer money in India. But which one should you use and when? This guide explains all three clearly.',
    content: `<h2>The Three Main Transfer Methods</h2><p>India has three primary electronic fund transfer systems — <strong>NEFT</strong>, <strong>RTGS</strong>, and <strong>IMPS</strong>. Each has its own use case, timing, and limits.</p><h2>NEFT — National Electronic Funds Transfer</h2><ul><li>Available 24x7 (since December 2019)</li><li>No minimum or maximum transfer limit</li><li>Transfers happen in batches (half-hourly)</li><li>Best for: non-urgent transfers of any amount</li></ul><h2>RTGS — Real Time Gross Settlement</h2><ul><li>Available 24x7</li><li>Minimum transfer: ₹2 lakh</li><li>No maximum limit</li><li>Transfers happen in real-time (instantly)</li><li>Best for: large, urgent transfers</li></ul><h2>IMPS — Immediate Payment Service</h2><ul><li>Available 24x7 including holidays</li><li>Transfer limit: up to ₹5 lakh per transaction</li><li>Instant transfer</li><li>Best for: urgent transfers of smaller amounts</li></ul><h2>Quick Comparison</h2><table><thead><tr><th>Feature</th><th>NEFT</th><th>RTGS</th><th>IMPS</th></tr></thead><tbody><tr><td>Speed</td><td>Batches</td><td>Instant</td><td>Instant</td></tr><tr><td>Min Amount</td><td>No limit</td><td>₹2 lakh</td><td>No limit</td></tr><tr><td>Availability</td><td>24x7</td><td>24x7</td><td>24x7</td></tr></tbody></table><h2>Which One Should You Use?</h2><ul><li>Sending ₹500 to a friend urgently → <strong>IMPS</strong></li><li>Paying a large vendor ₹5 lakh → <strong>RTGS</strong></li><li>Transferring salary at month end → <strong>NEFT</strong></li></ul>`
  },
  {
    title: 'UPI Payments Explained: How Does UPI Work?',
    slug: 'upi-payments-explained',
    category_slug: 'payments',
    tag: 'Payments',
    status: 'published',
    published_at: '2025-06-14 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&w=1200',
    excerpt: 'UPI has transformed how India pays. But how does it actually work? This guide explains UPI in simple terms — from setup to daily use.',
    content: `<h2>What Is UPI?</h2><p><strong>Unified Payments Interface (UPI)</strong> is a real-time payment system developed by the National Payments Corporation of India (NPCI). It allows you to transfer money instantly between bank accounts using just a mobile phone — 24x7, 365 days a year.</p><h2>How UPI Works</h2><ol><li>You download a UPI app (PhonePe, Google Pay, BHIM, Paytm, etc.)</li><li>Link your bank account to the app</li><li>Create a UPI ID (e.g., yourname@bankname)</li><li>Set a 4 or 6 digit UPI PIN</li><li>Send or receive money using UPI ID, mobile number, or QR code</li></ol><h2>Key Features of UPI</h2><ul><li><strong>Instant transfers</strong> — money moves in seconds</li><li><strong>Free</strong> — no transaction charges for users</li><li><strong>Secure</strong> — two-factor authentication (device + PIN)</li><li><strong>Multiple accounts</strong> — link more than one bank account</li><li><strong>Collect requests</strong> — request money from others</li></ul><h2>UPI Transaction Limits</h2><ul><li>Standard limit: ₹1 lakh per transaction</li><li>Some banks allow up to ₹2 lakh for verified users</li><li>Daily limit varies by bank (typically ₹1–5 lakh)</li></ul><h2>UPI Safety Tips</h2><ul><li>Never share your UPI PIN with anyone</li><li>Verify the receiver's name before sending</li><li>Do not scan unknown QR codes</li><li>Ignore "collect requests" from strangers</li></ul><p>UFS Digital's BC agents help customers set up UPI and use digital payments confidently in rural and semi-urban areas.</p>`
  },
  {
    title: 'Debit Card vs Credit Card: What\'s the Difference?',
    slug: 'debit-card-vs-credit-card',
    category_slug: 'cards',
    tag: 'Cards',
    status: 'published',
    published_at: '2025-06-16 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&w=1200',
    excerpt: 'Debit card or credit card — which one should you use? Understanding the difference can save you money and help you spend smarter.',
    content: `<h2>The Core Difference</h2><p>A <strong>debit card</strong> uses money already in your bank account. A <strong>credit card</strong> lets you borrow money from the bank up to a set limit, which you repay later.</p><h2>Debit Card</h2><ul><li>Linked directly to your savings or current account</li><li>Spend only what you have</li><li>No interest charges</li><li>No credit score impact</li><li>ATM cash withdrawal available</li><li>Best for: everyday spending, ATM use</li></ul><h2>Credit Card</h2><ul><li>Borrow up to your credit limit</li><li>Pay back within the billing cycle (interest-free period)</li><li>High interest if you miss payment (24–42% per year)</li><li>Builds your credit score</li><li>Rewards, cashback, and offers available</li><li>Best for: planned purchases, travel, emergencies</li></ul><h2>Key Comparison</h2><table><thead><tr><th>Feature</th><th>Debit Card</th><th>Credit Card</th></tr></thead><tbody><tr><td>Source of Funds</td><td>Your account</td><td>Bank credit</td></tr><tr><td>Interest</td><td>None</td><td>If unpaid</td></tr><tr><td>Credit Score</td><td>No impact</td><td>Builds score</td></tr><tr><td>Rewards</td><td>Limited</td><td>Yes</td></tr></tbody></table><h2>Which Should You Use?</h2><p>Use a <strong>debit card</strong> for daily expenses to avoid overspending. Use a <strong>credit card</strong> for larger purchases — but always pay the full bill on time to avoid interest charges.</p>`
  },
  {
    title: 'Digital Banking: How to Manage Your Bank Account Online',
    slug: 'digital-banking-for-beginners',
    category_slug: 'digital-banking',
    tag: 'Digital Banking',
    status: 'published',
    published_at: '2025-06-18 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&w=1200',
    excerpt: 'Digital banking lets you manage your money anytime, anywhere — no branch visits needed. Here\'s how to get started safely and confidently.',
    content: `<h2>What Is Digital Banking?</h2><p>Digital banking means managing your bank account through the internet — using a mobile app or website — instead of visiting a physical branch. You can check balances, transfer money, pay bills, and more, all from your phone.</p><h2>What Can You Do With Digital Banking?</h2><ul><li>Check account balance and transaction history</li><li>Transfer money (NEFT, RTGS, IMPS, UPI)</li><li>Pay utility bills (electricity, water, gas)</li><li>Recharge mobile and DTH</li><li>Apply for loans and fixed deposits</li><li>Download account statements</li><li>Block or unblock your debit card</li></ul><h2>How to Get Started</h2><ol><li>Visit your bank's website or download their official app</li><li>Register using your account number and registered mobile number</li><li>Set a username and password</li><li>Enable two-factor authentication (OTP)</li><li>Start using all features</li></ol><h2>Internet Banking vs Mobile Banking</h2><ul><li><strong>Internet Banking:</strong> Access via browser on computer or phone</li><li><strong>Mobile Banking:</strong> Dedicated app on your smartphone — faster and more convenient</li></ul><h2>Safety Best Practices</h2><ul><li>Always use the official bank app from Play Store or App Store</li><li>Never use public Wi-Fi for banking</li><li>Log out after every session</li><li>Set a strong, unique password</li><li>Enable login alerts via SMS</li></ul>`
  },
  {
    title: 'How to Keep Your Bank Account Safe from Online Fraud',
    slug: 'bank-account-online-security',
    category_slug: 'security',
    tag: 'Security',
    status: 'published',
    published_at: '2025-06-20 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=1200',
    excerpt: 'Online banking fraud is rising in India. Learn the most common scams and the simple steps you can take to protect your bank account right now.',
    content: `<h2>The Growing Threat of Online Fraud</h2><p>India reported over <strong>13.5 lakh cybercrime cases</strong> in 2023, with financial fraud being the most common. Understanding how fraudsters operate is your first line of defence.</p><h2>Common Types of Banking Fraud</h2><ul><li><strong>Phishing:</strong> Fake emails or SMS pretending to be your bank</li><li><strong>Vishing:</strong> Fraudulent phone calls asking for OTP or PIN</li><li><strong>SIM Swap:</strong> Fraudster gets a duplicate SIM to intercept OTPs</li><li><strong>Fake UPI Collect Requests:</strong> Scammers send collect requests disguised as payments</li><li><strong>Fake Customer Care:</strong> Fake bank helpline numbers on Google</li></ul><h2>10 Rules to Stay Safe</h2><ol><li>Never share OTP, PIN, or password with anyone — including bank staff</li><li>Always call the number on the back of your card, not numbers found online</li><li>Check the URL before entering banking credentials online</li><li>Enable SMS alerts for every transaction</li><li>Set a daily transaction limit on your account</li><li>Do not click links in SMS or WhatsApp claiming to be from your bank</li><li>Use a separate email ID for banking</li><li>Regularly check your account statement for unknown transactions</li><li>Report suspicious activity immediately to your bank's helpline</li><li>Register on the National Cyber Crime portal: cybercrime.gov.in</li></ol><h2>What to Do If You Are Defrauded</h2><ol><li>Call your bank immediately and block your account/card</li><li>File a complaint at cybercrime.gov.in or call 1930</li><li>Visit your nearest police station and file an FIR</li><li>Keep all transaction records and screenshots as evidence</li></ol>`
  },
  {
    title: 'Simple Money Management Tips for Better Financial Planning',
    slug: 'money-management-tips-for-beginners',
    category_slug: 'personal-finance',
    tag: 'Personal Finance',
    status: 'published',
    published_at: '2025-06-22 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&w=1200',
    excerpt: 'Good money management doesn\'t require a finance degree. These simple, practical tips will help you take control of your finances starting today.',
    content: `<h2>Why Money Management Matters</h2><p>Most financial problems — debt, inability to save, living paycheck to paycheck — come from poor money management habits, not low income. Small, consistent changes in how you handle money can transform your financial life.</p><h2>The 50-30-20 Rule</h2><p>This is the simplest budgeting framework:</p><ul><li><strong>50%</strong> of income → Needs (rent, food, bills, EMIs)</li><li><strong>30%</strong> of income → Wants (entertainment, dining out, shopping)</li><li><strong>20%</strong> of income → Savings and investments</li></ul><p>Even if you can't follow it perfectly, it gives you a clear direction.</p><h2>10 Practical Money Tips</h2><ol><li><strong>Track every expense</strong> — use a notebook or free app like Walnut or Money Manager</li><li><strong>Build an emergency fund</strong> — save 3–6 months of expenses in a liquid account</li><li><strong>Pay yourself first</strong> — transfer savings on the day you receive your salary</li><li><strong>Avoid lifestyle inflation</strong> — don't increase spending every time income rises</li><li><strong>Clear high-interest debt first</strong> — credit card debt at 36% destroys wealth fast</li><li><strong>Invest early</strong> — even ₹500/month in a SIP from age 25 grows significantly by 60</li><li><strong>Get insured</strong> — term life and health insurance before any investment</li><li><strong>Review subscriptions</strong> — cancel services you don't use regularly</li><li><strong>Set financial goals</strong> — short term (1 year), medium term (3–5 years), long term (10+ years)</li><li><strong>Learn continuously</strong> — read one personal finance article per week</li></ol><h2>Starting Small Is Fine</h2><p>You don't need a large income to start managing money well. Start with saving just ₹100 per day. That's ₹36,500 per year — enough to build a solid emergency fund in 2–3 years.</p><p>UFS Digital's BC agents provide free financial literacy guidance to help communities across India build better money habits.</p>`
  }
];

for (const blog of blogs) {
  try {
    const category_id = await getCategoryId(blog.category_slug);
    await query(
      `INSERT INTO blogs (title, slug, category_id, tag, status, published_at, cover_image_url, excerpt, content)
       VALUES (:title, :slug, :category_id, :tag, :status, :published_at, :cover_image_url, :excerpt, :content)
       ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content), excerpt = VALUES(excerpt), category_id = VALUES(category_id), status = VALUES(status)`,
      { title: blog.title, slug: blog.slug, category_id, tag: blog.tag, status: blog.status, published_at: blog.published_at, cover_image_url: blog.cover_image_url, excerpt: blog.excerpt, content: blog.content }
    );
    console.log('Inserted:', blog.slug);
  } catch (e) {
    console.error('Error:', blog.slug, e.message);
  }
}

await pool.end();
console.log('All 7 blogs done');
