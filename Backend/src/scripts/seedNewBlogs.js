import { query } from '../config/db.js';
import pool from '../config/db.js';

async function getCategoryId(slug) {
  const rows = await query('SELECT id FROM blog_categories WHERE slug = :slug LIMIT 1', { slug });
  return rows[0]?.id || null;
}

const blogs = [
  {
    title: 'How to Open a Bank Account: A Beginner\'s Guide',
    slug: 'how-to-open-a-bank-account',
    category_slug: 'account-services',
    tag: 'Account Services',
    status: 'published',
    published_at: '2025-06-01 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&w=1200',
    excerpt: 'Opening a bank account is the first step toward financial security. This beginner\'s guide walks you through everything you need to know — documents, process, and tips.',
    content: `<h2>Why You Need a Bank Account</h2><p>A bank account is the foundation of your financial life. It keeps your money safe, helps you receive payments, pay bills, and build a credit history. Without one, you miss out on government benefits, digital payments, and savings opportunities.</p><h2>Types of Bank Accounts</h2><ul><li><strong>Savings Account</strong> — For individuals to save money and earn interest</li><li><strong>Current Account</strong> — For businesses with high transaction volumes</li><li><strong>Zero Balance Account</strong> — No minimum balance required (BSBD accounts)</li><li><strong>Jan Dhan Account</strong> — Government scheme for unbanked citizens</li></ul><h2>Documents Required</h2><ul><li>Aadhaar Card (identity + address proof)</li><li>PAN Card</li><li>Passport-size photographs (2)</li><li>Mobile number linked to Aadhaar</li></ul><h2>Step-by-Step Process</h2><ol><li>Choose a bank and visit the nearest branch or CSP point</li><li>Fill the account opening form</li><li>Submit KYC documents</li><li>Complete biometric or OTP verification</li><li>Receive your account number and passbook</li></ol><h2>Open an Account Through UFS Digital</h2><p>You don't need to visit a bank branch. Our trained BC agents can help you open a bank account right in your village or locality — with full KYC support and zero hassle.</p>`
  },
  {
    title: 'Savings Account vs Current Account: What\'s the Difference?',
    slug: 'savings-account-vs-current-account',
    category_slug: 'account-services',
    tag: 'Account Services',
    status: 'published',
    published_at: '2025-06-05 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&w=1200',
    excerpt: 'Not sure whether to open a savings or current account? Here\'s a clear comparison to help you choose the right one for your needs.',
    content: `<h2>The Key Difference</h2><p>The main difference is simple: a <strong>Savings Account</strong> is for individuals who want to save money and earn interest, while a <strong>Current Account</strong> is for businesses that need to make frequent transactions without limits.</p><h2>Savings Account</h2><ul><li>Earns interest (typically 2.5% to 4% per year)</li><li>Limited withdrawals per month</li><li>Minimum balance requirement (or zero balance options)</li><li>Best for salaried individuals, students, homemakers</li></ul><h2>Current Account</h2><ul><li>No interest earned on balance</li><li>Unlimited transactions allowed</li><li>Higher minimum balance required</li><li>Overdraft facility available</li><li>Best for traders, businesses, firms</li></ul><h2>Quick Comparison Table</h2><table><thead><tr><th>Feature</th><th>Savings Account</th><th>Current Account</th></tr></thead><tbody><tr><td>Interest</td><td>Yes (2.5–4%)</td><td>No</td></tr><tr><td>Transaction Limit</td><td>Limited</td><td>Unlimited</td></tr><tr><td>Overdraft</td><td>No</td><td>Yes</td></tr><tr><td>Best For</td><td>Individuals</td><td>Businesses</td></tr></tbody></table><h2>Which One Should You Choose?</h2><p>If you are a salaried person, student, or homemaker — go with a <strong>Savings Account</strong>. If you run a shop, business, or firm — a <strong>Current Account</strong> is the right choice.</p>`
  },
  {
    title: 'What Is a Personal Loan and How Does It Work?',
    slug: 'what-is-a-personal-loan',
    category_slug: 'loans',
    tag: 'Loans',
    status: 'published',
    published_at: '2025-06-08 10:00:00',
    cover_image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=1200',
    excerpt: 'A personal loan can help you meet urgent financial needs — but only if you understand how it works. Here\'s everything you need to know before applying.',
    content: `<h2>What Is a Personal Loan?</h2><p>A personal loan is an <strong>unsecured loan</strong> — meaning you don't need to pledge any asset as collateral. Banks and NBFCs lend you a fixed amount which you repay in monthly instalments (EMIs) over a set period.</p><h2>How Does It Work?</h2><ol><li>You apply for a loan amount</li><li>The lender checks your credit score and income</li><li>If approved, the amount is credited to your account</li><li>You repay via fixed EMIs every month</li><li>Loan closes after all EMIs are paid</li></ol><h2>Key Features</h2><ul><li><strong>Loan Amount:</strong> ₹10,000 to ₹40 lakh</li><li><strong>Interest Rate:</strong> 10% to 24% per annum</li><li><strong>Tenure:</strong> 1 to 5 years</li><li><strong>No Collateral</strong> required</li><li><strong>Quick Disbursal</strong> — sometimes within 24 hours</li></ul><h2>When Should You Take a Personal Loan?</h2><ul><li>Medical emergency</li><li>Home renovation</li><li>Wedding expenses</li><li>Debt consolidation</li><li>Education fees</li></ul><h2>Things to Check Before Applying</h2><ul><li>Compare interest rates across lenders</li><li>Check processing fees and hidden charges</li><li>Calculate your EMI using an online calculator</li><li>Ensure your credit score is above 700</li></ul><p>UFS Digital's BC agents can help you with loan application assistance and guide you to the right lender for your needs.</p>`
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
console.log('Blogs 1-3 done');
