import { CalculatorSEOData, CalculatorCategory } from '../types';

export const CALCULATORS_DATA: CalculatorSEOData[] = [
  {
    id: 'percentage',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'Math',
    icon: 'Percent',
    shortDescription: 'Calculate basic percentages, percentage increase or decrease, and percentage differences easily.',
    metaTitle: 'Free Percentage Calculator Online - Fast & Accurate Percent Tool',
    metaDescription: 'Use our free online Percentage Calculator to calculate percentage of a number, percentage increase or decrease, and what percentage A is of B.',
    h1: 'Online Percentage Calculator',
    intro: 'The Percentage Calculator on Asan Calculator helps you quickly solve common percentage problems. Whether you need to figure out a retail sales tax, calculate a score percentage, or analyze month-over-month growth, this tool delivers instant, accurate calculations without manual math errors.',
    howToUse: [
      'Select your calculation type (Value % of Number, % Increase/Decrease, or What % is A of B).',
      'Enter the respective numbers into the input boxes.',
      'Check the real-time result, copy the computed output, or reset the values with one click.'
    ],
    formulas: [
      {
        title: 'Percentage of a Number',
        expression: 'P = (Percentage / 100) × Base Number',
        explanation: 'Multiply the percentage rate by the base number and divide by 100.'
      },
      {
        title: 'Percentage Increase or Decrease',
        expression: '% Change = ((New Value - Old Value) / |Old Value|) × 100',
        explanation: 'Subtract the initial value from the final value, divide by the absolute initial value, and multiply by 100.'
      },
      {
        title: 'What Percentage is A of B',
        expression: 'Percentage = (A / B) × 100',
        explanation: 'Divide number A by number B and multiply the fraction by 100.'
      }
    ],
    example: {
      title: 'Example: Calculating a 15% discount on Rs. 4,500',
      scenario: 'You want to find 15% of a grocery bill totaling PKR 4,500.',
      steps: [
        'Percentage = 15, Base Number = 4500',
        'Calculation: (15 / 100) × 4500 = 0.15 × 4500',
        'Result = PKR 675'
      ],
      result: '15% of Rs. 4,500 is Rs. 675.'
    },
    faqs: [
      {
        question: 'How do I calculate a percentage increase between two numbers?',
        answer: 'To calculate percentage increase: subtract the old number from the new number, divide that difference by the original old number, then multiply the result by 100.'
      },
      {
        question: 'Can this percentage calculator handle negative values?',
        answer: 'Yes, both positive and negative percentage changes are automatically calculated and clearly signed.'
      },
      {
        question: 'Why do percentages matter for everyday Pakistani shoppers?',
        answer: 'Percentages help compare discounts during festive sales (Eid, Blessed Friday), calculate GST additions, and track investment returns.'
      }
    ],
    relatedSlugs: ['discount-calculator', 'gst-calculator', 'percentage-to-marks-calculator', 'profit-loss-calculator']
  },
  {
    id: 'age',
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'Date & Time',
    icon: 'Calendar',
    shortDescription: 'Calculate your exact age in years, months, days, total weeks, and days until your next birthday.',
    metaTitle: 'Age Calculator Online - Exact Age in Years, Months & Days',
    metaDescription: 'Accurately find your exact age in years, months, and days from your date of birth. Discover your upcoming birthday countdown instantly.',
    h1: 'Online Age Calculator',
    intro: 'Determine your chronological age with precision using the Asan Age Calculator. It calculates exact years, months, days, and shows the exact countdown to your next birthday. Ideal for passport applications, school admissions, job exams, and NADRA verification checks in Pakistan.',
    howToUse: [
      'Select or type your Date of Birth in the date picker.',
      'Optionally adjust the "Calculate Age at Date" (defaults to today).',
      'Review your exact age breakdown in years, months, and days, along with total living days and countdown to your next birthday.'
    ],
    formulas: [
      {
        title: 'Chronological Age Calculation',
        expression: 'Age = Target Date - Date of Birth (accounting for leap years and calendar days in each month)',
        explanation: 'The calculation factors in varying month lengths (28, 29, 30, or 31 days) to deliver true astronomical calendar age.'
      }
    ],
    example: {
      title: 'Example: Born on March 15, 1998 evaluated on September 15, 2026',
      scenario: 'Determining exact age for a professional qualification application.',
      steps: [
        'Birth Date: 1998-03-15, Assessment Date: 2026-09-15',
        'Year difference: 2026 - 1998 = 28 years',
        'Month difference: 09 - 03 = 6 months',
        'Day difference: 15 - 15 = 0 days'
      ],
      result: 'Exact Age: 28 Years, 6 Months, and 0 Days.'
    },
    faqs: [
      {
        question: 'Does this age calculator account for leap years?',
        answer: 'Yes, leap years (February with 29 days) are automatically evaluated in the exact day and month calculations.'
      },
      {
        question: 'Can I calculate what my age will be on a future date?',
        answer: 'Yes, simply change the "Age at Date" field to any past or future date to compute your exact age on that day.'
      },
      {
        question: 'Why is an exact age calculator helpful for Pakistani government jobs?',
        answer: 'Federal and provincial competitive exams (FPSC, PPSC, SPSC, KPPSC) enforce strict upper and lower age cut-offs to the exact day.'
      }
    ],
    relatedSlugs: ['time-date-calculator', 'percentage-calculator', 'gpa-calculator']
  },
  {
    id: 'bmi',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'Health',
    icon: 'Activity',
    shortDescription: 'Calculate Body Mass Index (BMI) using metric or imperial units and check your health category.',
    metaTitle: 'BMI Calculator Online - Free Body Mass Index & Health Range',
    metaDescription: 'Check your Body Mass Index (BMI) instantly. Supports kilograms, pounds, centimeters, feet, and inches with WHO health classification categories.',
    h1: 'Body Mass Index (BMI) Calculator',
    intro: 'Use our free BMI Calculator to check whether your body weight falls into a healthy range according to World Health Organization (WHO) standards. Switch seamlessly between metric (kg/cm) and imperial (lbs/feet/inches) measurements.',
    howToUse: [
      'Choose your preferred measurement system: Metric (kg, cm) or Imperial (lbs, ft & in).',
      'Input your current weight and height accurately.',
      'Instantly see your BMI score, classification (Underweight, Normal, Overweight, Obese), and prime healthy weight target range.'
    ],
    formulas: [
      {
        title: 'Metric BMI Formula',
        expression: 'BMI = Weight (kg) / [Height (m)]²',
        explanation: 'Divide weight in kilograms by height in meters squared.'
      },
      {
        title: 'Imperial BMI Formula',
        expression: 'BMI = 703 × [Weight (lbs) / (Height (inches))²]',
        explanation: 'Multiply weight in pounds by 703, then divide by height in inches squared.'
      }
    ],
    example: {
      title: 'Example: Height 5 ft 9 in (175 cm) & Weight 72 kg',
      scenario: 'Evaluating health category for an active adult.',
      steps: [
        'Height in meters = 1.75 m',
        'Height squared = 1.75 × 1.75 = 3.0625',
        'BMI = 72 / 3.0625 = 23.51 kg/m²'
      ],
      result: 'BMI = 23.5 (Normal Healthy Weight category, 18.5 - 24.9).'
    },
    faqs: [
      {
        question: 'What is a normal BMI for South Asian and Pakistani adults?',
        answer: 'While the standard WHO normal range is 18.5 to 24.9, health organizations often note South Asian populations have elevated cardiometabolic risks above 23.0.'
      },
      {
        question: 'Does BMI distinguish between muscle mass and fat?',
        answer: 'BMI provides a useful screening metric for the general public, though athletes with heavy muscle mass may have a higher BMI without excess adiposity.'
      },
      {
        question: 'How can I reach my ideal BMI range?',
        answer: 'Adopting a balanced nutrient-dense diet, controlling portion sizes, and incorporating 150 minutes of moderate weekly exercise helps maintain a healthy weight.'
      }
    ],
    relatedSlugs: ['unit-converter', 'age-calculator', 'percentage-calculator']
  },
  {
    id: 'loan',
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'Finance',
    icon: 'Landmark',
    shortDescription: 'Calculate monthly loan payments, total interest payable, and amortization breakdown.',
    metaTitle: 'Loan Calculator Online - Monthly Payments & Interest Breakdown',
    metaDescription: 'Calculate your monthly loan payments, total interest cost, and full repayment schedule. Suitable for personal, car, and home loans in Pakistan.',
    h1: 'Online Loan Calculator',
    intro: 'Planning to borrow from commercial banks or microfinance institutions? The Asan Loan Calculator lets you calculate exact monthly repayments, cumulative interest fees, and total payoff costs with an interactive yearly/monthly amortization table.',
    howToUse: [
      'Enter the principal loan amount (PKR or your currency).',
      'Input the annual interest rate (%).',
      'Provide the loan duration in either years or months.',
      'View the monthly installment, total interest paid, total amount payable, and amortization summary.'
    ],
    formulas: [
      {
        title: 'Monthly Amortization Formula',
        expression: 'M = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ - 1]',
        explanation: 'Where P is principal loan amount, r is periodic monthly interest rate (annual rate / 1200), and n is total months.'
      }
    ],
    example: {
      title: 'Example: Rs. 1,000,000 personal loan for 3 years at 16% annual interest',
      scenario: 'Bank financing for home renovation in Lahore.',
      steps: [
        'Principal P = 1,000,000, Annual Rate = 16%, Months n = 36',
        'Monthly rate r = 16 / 1200 = 0.013333',
        'Monthly Payment M = PKR 35,157'
      ],
      result: 'Monthly installment: Rs. 35,157. Total interest: Rs. 265,655. Total payment: Rs. 1,265,655.'
    },
    faqs: [
      {
        question: 'What is the difference between fixed and floating interest rates?',
        answer: 'A fixed rate remains constant throughout the loan term, whereas a floating rate in Pakistan typically adjusts with the State Bank KIBOR benchmark.'
      },
      {
        question: 'Can I use this calculator for auto finance and car loans?',
        answer: 'Yes, this calculator works for any standard reducing-balance loan including car financing and personal loans.'
      },
      {
        question: 'How does paying off a loan early save money?',
        answer: 'Prepaying principal reduces the outstanding balance upon which daily or monthly interest is accrued, cutting down total finance charges.'
      }
    ],
    relatedSlugs: ['emi-calculator', 'simple-interest-calculator', 'compound-interest-calculator', 'salary-calculator']
  },
  {
    id: 'simple-interest',
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    category: 'Finance',
    icon: 'Coins',
    shortDescription: 'Compute simple interest and overall accumulated amount over time for loans and savings.',
    metaTitle: 'Simple Interest Calculator - Fast Principal & Interest Tool',
    metaDescription: 'Calculate simple interest, total interest earned, and final maturity amount for fixed deposits, promissory notes, and personal lending.',
    h1: 'Simple Interest Calculator',
    intro: 'Simple interest is the easiest method of calculating interest on savings certificates, private loans, and informal finance agreements. Our calculator gives you the exact interest and aggregate maturity total instantly.',
    howToUse: [
      'Enter the starting principal amount.',
      'Enter the annual interest rate percentage.',
      'Enter the time duration in years or months.',
      'Review the calculated interest earned and total return amount.'
    ],
    formulas: [
      {
        title: 'Simple Interest Formula',
        expression: 'SI = (P × R × T) / 100',
        explanation: 'Where P = Principal, R = Annual Rate of Interest, and T = Time in years.'
      },
      {
        title: 'Total Maturity Amount',
        expression: 'A = P + SI',
        explanation: 'Sum of original principal and total accrued interest.'
      }
    ],
    example: {
      title: 'Example: Rs. 200,000 invested at 12% per year for 2.5 years',
      scenario: 'Evaluating simple return on a short-term certificate.',
      steps: [
        'P = 200,000, R = 12, T = 2.5',
        'SI = (200,000 × 12 × 2.5) / 100 = 60,000',
        'Total Amount = 200,000 + 60,000 = 260,000'
      ],
      result: 'Interest Earned: Rs. 60,000. Total Payout: Rs. 260,000.'
    },
    faqs: [
      {
        question: 'Where is simple interest commonly used in Pakistan?',
        answer: 'Simple interest is used in short-term promissory notes, car leasing flat charges, and basic commercial agreements.'
      },
      {
        question: 'How is simple interest different from compound interest?',
        answer: 'Simple interest only pays on the original principal, whereas compound interest generates interest on both initial principal and previously accumulated interest.'
      }
    ],
    relatedSlugs: ['compound-interest-calculator', 'loan-calculator', 'emi-calculator']
  },
  {
    id: 'compound-interest',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'Finance',
    icon: 'TrendingUp',
    shortDescription: 'Calculate compound interest growth, final balance, and interest accrued with flexible compounding periods.',
    metaTitle: 'Compound Interest Calculator - Future Value & Growth',
    metaDescription: 'Grow your wealth with the power of compounding. Calculate compound interest with annual, semi-annual, quarterly, and monthly compounding frequencies.',
    h1: 'Compound Interest Calculator',
    intro: 'Compound interest is the foundation of long-term wealth creation. Calculate how your savings, National Savings Schemes (Behbood, Special Savings), mutual funds, or bank deposits grow over time when interest is continuously reinvested.',
    howToUse: [
      'Enter the initial principal investment amount.',
      'Enter the expected annual interest/profit rate.',
      'Select compounding frequency (Annually, Semi-Annually, Quarterly, Monthly, or Daily).',
      'Enter the investment horizon in years.',
      'Examine the final future value and total compound interest accumulated.'
    ],
    formulas: [
      {
        title: 'Compound Interest Formula',
        expression: 'A = P × (1 + r / n)^(n × t)',
        explanation: 'Where P is principal, r is decimal annual rate, n is compounding cycles per year, and t is time in years.'
      }
    ],
    example: {
      title: 'Example: Rs. 500,000 invested at 14% compounded quarterly for 5 years',
      scenario: 'Long-term investment portfolio allocation.',
      steps: [
        'P = 500,000, r = 0.14, n = 4 (quarterly), t = 5',
        'Rate per cycle: 0.14 / 4 = 0.035, Total periods: 4 × 5 = 20',
        'Future Value = 500,000 × (1.035)^20 = Rs. 994,894'
      ],
      result: 'Final Maturity Value: Rs. 994,894. Total Profit Earned: Rs. 494,894.'
    },
    faqs: [
      {
        question: 'How does compounding frequency impact returns?',
        answer: 'The more frequently interest is compounded (e.g. monthly vs annually), the higher the effective annual yield because interest is credited and reinvested sooner.'
      },
      {
        question: 'Can I use this for Pakistani National Savings certificates?',
        answer: 'Yes, this tool models reinvested profit certificates such as Defence Savings Certificates and mutual fund SIPs.'
      }
    ],
    relatedSlugs: ['simple-interest-calculator', 'loan-calculator', 'salary-calculator']
  },
  {
    id: 'emi',
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'Finance',
    icon: 'CreditCard',
    shortDescription: 'Calculate Equated Monthly Installment (EMI) for home, car, or consumer loans with interest breakdown.',
    metaTitle: 'EMI Calculator Online - Calculate Equated Monthly Installment',
    metaDescription: 'Free EMI Calculator to find your monthly loan payments, total interest payable, and overall loan cost. Accurate results for Pakistani bank financing.',
    h1: 'Equated Monthly Installment (EMI) Calculator',
    intro: 'Calculate your exact monthly EMI before applying for home financing, auto loans, or electronic appliance installments. Understanding your monthly liability ensures you keep debt service ratios within manageable budgeting limits.',
    howToUse: [
      'Input the loan principal amount.',
      'Enter the bank annual interest or profit rate (%).',
      'Specify the tenure in years or total months.',
      'Inspect the computed monthly EMI, total interest, and principal vs interest visual proportion.'
    ],
    formulas: [
      {
        title: 'Standard EMI Formula',
        expression: 'EMI = [P × r × (1 + r)ⁿ] / [(1 + r)ⁿ - 1]',
        explanation: 'P = Principal amount, r = Monthly interest rate (Annual rate / 12 / 100), n = Loan tenure in months.'
      }
    ],
    example: {
      title: 'Example: Auto financing of Rs. 2,500,000 for 5 years at 18% annual rate',
      scenario: 'Financing a new sedan in Karachi.',
      steps: [
        'P = 2,500,000, Annual Rate = 18%, n = 60 months',
        'r = 18 / 1200 = 0.015',
        'EMI = [2,500,000 × 0.015 × (1.015)^60] / [(1.015)^60 - 1] = PKR 63,481'
      ],
      result: 'Monthly EMI: Rs. 63,481. Total Repayment: Rs. 3,808,860. Total Interest: Rs. 1,308,860.'
    },
    faqs: [
      {
        question: 'What is an Equated Monthly Installment (EMI)?',
        answer: 'An EMI is a fixed payment amount made by a borrower to a lender at a specified date each calendar month, composed of both principal repayment and interest charges.'
      },
      {
        question: 'How do interest rates affect my monthly EMI?',
        answer: 'Higher interest rates increase your monthly installment and total financing cost. Even a 1% rate change can notably alter multi-year mortgage expenses.'
      }
    ],
    relatedSlugs: ['loan-calculator', 'salary-calculator', 'gst-calculator']
  },
  {
    id: 'gst',
    slug: 'gst-calculator',
    name: 'GST Calculator',
    category: 'Finance',
    icon: 'Receipt',
    shortDescription: 'Calculate Goods and Services Tax (GST/Sales Tax) in Pakistan. Easily calculate tax inclusive and exclusive amounts.',
    metaTitle: 'GST Calculator Pakistan - FBR Sales Tax Inclusive & Exclusive',
    metaDescription: 'Calculate Pakistan GST and Sales Tax (18% standard FBR, 16% PRA, 13% SRB, 15% KPRA). Find gross price, net price, and exact tax amount.',
    h1: 'Pakistan GST & Sales Tax Calculator',
    intro: 'Calculate Goods and Services Tax (Sales Tax) in Pakistan quickly and accurately. Whether you are a business owner issuing invoices, a retailer calculating FBR POS tax, or a consumer checking a restaurant or retail receipt, this calculator handles standard 18% FBR rates, provincial service tax rates (Punjab PRA 16%, Sindh SRB 13%, KP KPRA 15%), or any custom rate.',
    howToUse: [
      'Enter the base or total amount in Pakistani Rupees (PKR).',
      'Select a popular tax preset (18% FBR Standard, 16% PRA, 13% SRB, 15% KPRA) or enter a custom rate.',
      'Choose whether to "Add GST" (Exclusive to Inclusive) or "Remove GST" (Inclusive to Exclusive).',
      'View the net price, GST amount, and gross final invoice total.'
    ],
    formulas: [
      {
        title: 'GST Exclusive (Adding GST to Base Price)',
        expression: 'GST Amount = (Base Price × GST Rate) / 100\nTotal Price = Base Price + GST Amount',
        explanation: 'Used when tax is added on top of the original shelf price.'
      },
      {
        title: 'GST Inclusive (Extracting GST from Total Price)',
        expression: 'Base Price = Total Price / (1 + (GST Rate / 100))\nGST Amount = Total Price - Base Price',
        explanation: 'Used to determine original price and tax paid from a final retail receipt.'
      }
    ],
    example: {
      title: 'Example: Electronics item priced at Rs. 50,000 with 18% standard GST',
      scenario: 'Calculating sales tax on a laptop purchase.',
      steps: [
        'Base Price = PKR 50,000, GST Rate = 18%',
        'GST Amount = (50,000 × 18) / 100 = PKR 9,000',
        'Total Invoice Amount = 50,000 + 9,000 = PKR 59,000'
      ],
      result: 'Net: Rs. 50,000. GST (18%): Rs. 9,000. Total with GST: Rs. 59,000.'
    },
    faqs: [
      {
        question: 'What is the standard federal sales tax rate in Pakistan?',
        answer: 'The standard federal General Sales Tax (GST) rate administered by the Federal Board of Revenue (FBR) on goods is currently 18%.'
      },
      {
        question: 'What are the provincial sales tax rates on services in Pakistan?',
        answer: 'Provincial sales tax on services varies: Punjab (PRA) is typically 16%, Sindh (SRB) is 13%, Khyber Pakhtunkhwa (KPRA) is 15%, and Balochistan (BRA) is 15%.'
      },
      {
        question: 'How do I extract GST from an inclusive retail bill?',
        answer: 'Divide the total bill amount by 1.18 (for an 18% GST rate) to get the pre-tax price. Subtract the pre-tax price from the total to get the exact tax amount.'
      }
    ],
    relatedSlugs: ['discount-calculator', 'percentage-calculator', 'profit-loss-calculator']
  },
  {
    id: 'discount',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'Finance',
    icon: 'Tag',
    shortDescription: 'Calculate sale savings, discounted price, and final cost after percentage or fixed price reductions.',
    metaTitle: 'Discount Calculator Online - Sale Price & Savings Tool',
    metaDescription: 'Find out exactly how much you save on shopping discounts. Calculates discounted final price and savings in rupees or percentage.',
    h1: 'Online Discount Calculator',
    intro: 'Never wonder how much an item actually costs during a promotional sale. The Asan Discount Calculator lets you determine final price, total money saved, and optional double-discount calculations for clearance sales in shopping malls and online stores.',
    howToUse: [
      'Enter the original retail price.',
      'Enter the discount percentage (e.g. 20%, 30%, 50%).',
      'Optionally add an additional coupon or bank card discount percentage.',
      'Instantly see your final payable price and total savings.'
    ],
    formulas: [
      {
        title: 'Discount Calculation',
        expression: 'Discount Amount = Original Price × (Discount % / 100)\nFinal Price = Original Price - Discount Amount',
        explanation: 'Calculate the rupee reduction and subtract it from the regular sticker price.'
      }
    ],
    example: {
      title: 'Example: Branded lawn suit originally Rs. 7,990 with 30% Eid clearance',
      scenario: 'Shopping festival sale in Islamabad.',
      steps: [
        'Original Price = PKR 7,990, Discount = 30%',
        'Savings = 7,990 × 0.30 = PKR 2,397',
        'Payable Price = 7,990 - 2,397 = PKR 5,593'
      ],
      result: 'Final Price: Rs. 5,593. Total Saved: Rs. 2,397.'
    },
    faqs: [
      {
        question: 'How do stacked discounts (e.g., 20% off + extra 10% credit card) work?',
        answer: 'The second discount is typically applied to the already discounted price rather than simply adding the percentages together (i.e. 20% + 10% does not equal 30%).'
      },
      {
        question: 'Can I use this for wholesale business markdowns?',
        answer: 'Yes, trade discounts and bulk wholesale markdowns can be calculated effortlessly.'
      }
    ],
    relatedSlugs: ['gst-calculator', 'percentage-calculator', 'profit-loss-calculator']
  },
  {
    id: 'profit-loss',
    slug: 'profit-loss-calculator',
    name: 'Profit & Loss Calculator',
    category: 'Finance',
    icon: 'ArrowUpDown',
    shortDescription: 'Calculate gross profit, net loss, profit margin, and markup percentage for trading and retail.',
    metaTitle: 'Profit & Loss Calculator - Calculate Margin & Markup',
    metaDescription: 'Easily calculate profit or loss amount and percentage from cost price and selling price. Perfect for traders, e-commerce sellers, and shopkeepers.',
    h1: 'Profit & Loss Calculator',
    intro: 'Accurately assess your business transactions, product margins, and trade profits with the Asan Profit & Loss Calculator. Essential for retail shop owners, Daraz e-commerce sellers, stock market traders, and small businesses across Pakistan.',
    howToUse: [
      'Enter the Cost Price (CP) - the amount you spent to acquire or produce the item.',
      'Enter the Selling Price (SP) - the price you sold or plan to sell it for.',
      'Instantly observe whether the transaction resulted in Profit or Loss, the absolute difference in PKR, and the profit margin/loss percentage.'
    ],
    formulas: [
      {
        title: 'Profit Formula (When SP > CP)',
        expression: 'Profit = Selling Price - Cost Price\nProfit % = (Profit / Cost Price) × 100',
        explanation: 'Profit percentage is calculated relative to the cost of procurement.'
      },
      {
        title: 'Loss Formula (When CP > SP)',
        expression: 'Loss = Cost Price - Selling Price\nLoss % = (Loss / Cost Price) × 100',
        explanation: 'Loss percentage indicates capital lost relative to the cost investment.'
      }
    ],
    example: {
      title: 'Example: Wholesaler buys inventory for Rs. 120,000 and sells for Rs. 156,000',
      scenario: 'Commercial trading batch in Faisalabad textile market.',
      steps: [
        'Cost Price (CP) = PKR 120,000, Selling Price (SP) = PKR 156,000',
        'Net Profit = 156,000 - 120,000 = PKR 36,000',
        'Profit % = (36,000 / 120,000) × 100 = 30.0%'
      ],
      result: 'Net Profit: Rs. 36,000 (30.0% Profit Margin on Cost).'
    },
    faqs: [
      {
        question: 'What is the difference between Profit Margin and Markup?',
        answer: 'Profit Margin is profit divided by Selling Price, while Markup is profit divided by Cost Price.'
      },
      {
        question: 'Can I include shipping and packaging in the Cost Price?',
        answer: 'Yes, including all direct landed costs into Cost Price yields your true operational profit.'
      }
    ],
    relatedSlugs: ['gst-calculator', 'discount-calculator', 'percentage-calculator']
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'Unit Conversion',
    icon: 'ArrowRightLeft',
    shortDescription: 'Convert Pakistani land units (Acre, Kanal, Marla, Sq Ft) plus distance, weight, temperature, and volume.',
    metaTitle: 'Unit Converter Online - Land Units (Kanal, Marla), Length & Weight',
    metaDescription: 'Convert Pakistani land units: Acre to Kanal, Kanal to Marla, Marla to Square Feet, Hectare to Acre. Plus km to miles, kg to lbs, Celsius to Fahrenheit.',
    h1: 'Online Multi-Unit Converter',
    intro: 'A comprehensive, multi-category unit conversion tool customized for Pakistan. In addition to standard metric and imperial conversions (distance, weight, temperature, volume), it features full conversion for traditional Pakistani real estate land units: Acre, Kanal, Marla (both standard 225 sq ft and traditional 272 sq ft), and Square Feet.',
    howToUse: [
      'Select your conversion category: Pakistani Land Units, Length / Distance, Mass / Weight, Temperature, or Volume.',
      'Enter the magnitude or quantity to convert.',
      'Choose the "From" and "To" units.',
      'The exact mathematical conversion updates instantaneously.'
    ],
    formulas: [
      {
        title: 'Pakistani Land Measurements',
        expression: '1 Acre = 8 Kanals\n1 Kanal = 20 Marlas\n1 Marla = 225 sq ft (Modern urban / LDA / CDA) or 272.25 sq ft (Revenue/Patwari)\n1 Hectare = 2.47105 Acres',
        explanation: 'Standard conversions utilized across real estate in Punjab, Sindh, Islamabad, and KP.'
      },
      {
        title: 'Common International Conversions',
        expression: '1 km = 0.621371 miles\n1 m = 3.28084 feet\n1 kg = 2.20462 lbs\n°F = (°C × 9/5) + 32\n1 Liter = 0.264172 US Gallons',
        explanation: 'Standard metric to imperial conversion factors.'
      }
    ],
    example: {
      title: 'Example: Converting a 10 Marla residential plot in Lahore to Square Feet',
      scenario: 'Checking plot dimensions for construction approval.',
      steps: [
        'Standard urban development rate: 1 Marla = 225 sq ft',
        'Calculation: 10 Marlas × 225 = 2,250 sq ft',
        'In kanals: 10 / 20 = 0.5 Kanal (Half Kanal)'
      ],
      result: '10 Marlas = 2,250 sq ft (or 0.5 Kanal).'
    },
    faqs: [
      {
        question: 'Why are there two different Marla sizes in Pakistan (225 vs 272.25 sq ft)?',
        answer: 'Modern private housing societies (DHA, Bahria, LDA, CDA) standardise 1 Marla as 225 square feet (making 1 Kanal = 4,500 sq ft). The traditional government revenue/Patwari system (Karam based) calculates 1 Marla as 272.25 square feet (making 1 Kanal = 5,445 sq ft).'
      },
      {
        question: 'How many Marlas are in an Acre?',
        answer: 'Since 1 Acre contains 8 Kanals, and each Kanal has 20 Marlas, 1 Acre equals exactly 160 Marlas.'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'bmi-calculator', 'time-date-calculator']
  },
  {
    id: 'time-date',
    slug: 'time-date-calculator',
    name: 'Time & Date Calculator',
    category: 'Date & Time',
    icon: 'Clock',
    shortDescription: 'Calculate days between dates, add or subtract days, and convert hours to minutes and minutes to seconds.',
    metaTitle: 'Time & Date Calculator - Days Between Dates & Time Conversion',
    metaDescription: 'Find duration between two dates in days, months, and years. Add or subtract days from any date, and convert hours to minutes and seconds.',
    h1: 'Online Time & Date Calculator',
    intro: 'Calculate exact time intervals between two dates, find project deadlines by adding or subtracting business days, or convert hours into minutes and seconds with precision. Essential for event planning, legal notices, visa validity, and project management.',
    howToUse: [
      'Choose your tool: Date Difference, Add/Subtract Days, or Hours/Minutes Converter.',
      'Input the primary date or time duration.',
      'Click Calculate or view dynamic real-time results.'
    ],
    formulas: [
      {
        title: 'Date Duration Formula',
        expression: 'Difference = |End Date - Start Date| (in milliseconds) / (1000 × 60 × 60 × 24)',
        explanation: 'Converts millisecond calendar timestamps into total elapsed days.'
      },
      {
        title: 'Time Unit Conversion',
        expression: 'Minutes = Hours × 60\nSeconds = Minutes × 60 = Hours × 3600',
        explanation: 'Standard sexagesimal time conversions.'
      }
    ],
    example: {
      title: 'Example: Counting days between August 14 and December 25',
      scenario: 'Calculating national holiday intervals.',
      steps: [
        'Start: August 14, End: December 25 of the same year',
        'Days in August remaining: 17, Sept: 30, Oct: 31, Nov: 30, Dec: 25',
        'Total sum = 17 + 30 + 31 + 30 + 25 = 133 days'
      ],
      result: 'Total duration is 133 days (or 19 weeks and 0 days).'
    },
    faqs: [
      {
        question: 'Does this calculator include both start and end dates?',
        answer: 'By default it counts the elapsed days between dates. An option allows you to include the end date if required for legal tenancy or contract terms.'
      },
      {
        question: 'Can I calculate negative date intervals?',
        answer: 'The calculator clearly shows which date is earlier and displays the absolute positive difference in days and weeks.'
      }
    ],
    relatedSlugs: ['age-calculator', 'salary-calculator', 'unit-converter']
  },
  {
    id: 'salary',
    slug: 'salary-calculator',
    name: 'Salary Calculator',
    category: 'Finance',
    icon: 'Briefcase',
    shortDescription: 'Break down your salary into annual, monthly, daily, and hourly earnings based on working days.',
    metaTitle: 'Salary Calculator Pakistan - Monthly, Annual, Daily & Hourly Wages',
    metaDescription: 'Convert your monthly or annual salary into daily pay and hourly rate. Factor in working days per week and daily work hours.',
    h1: 'Salary & Wage Calculator',
    intro: 'Understand your true hourly and daily earning rate with the Asan Salary Calculator. Whether you work on a monthly payroll, freelance on Upwork/Fiverr, or need to calculate overtime and per-day deductions for leave, this tool computes exact income figures.',
    howToUse: [
      'Enter your Monthly or Annual base salary in PKR.',
      'Specify your standard working days per week (typically 5 or 6 days).',
      'Specify daily working hours (typically 8 hours).',
      'View your complete income breakdown: Annual, Monthly, Weekly, Daily, and Hourly rate.'
    ],
    formulas: [
      {
        title: 'Annual to Monthly & Daily Breakdown',
        expression: 'Annual Salary = Monthly × 12\nDaily Pay = Monthly Salary / Working Days in Month\nHourly Rate = Daily Pay / Working Hours per Day',
        explanation: 'Derives fair equivalent compensation across multiple time units.'
      }
    ],
    example: {
      title: 'Example: Rs. 150,000 monthly salary with 22 working days and 8 hours/day',
      scenario: 'Determining hourly consulting billing rate.',
      steps: [
        'Monthly = PKR 150,000, Working days = 22, Daily hours = 8',
        'Daily Pay = 150,000 / 22 = PKR 6,818.18',
        'Hourly Rate = 6,818.18 / 8 = PKR 852.27'
      ],
      result: 'Daily wage: Rs. 6,818.18 | Hourly rate: Rs. 852.27 | Annual package: Rs. 1,800,000.'
    },
    faqs: [
      {
        question: 'How do paid public holidays affect daily salary in Pakistan?',
        answer: 'Standard employment contracts in Pakistan compute daily leave pay based on 22 or 26 days per month or calendar days (30 days) depending on company policy.'
      },
      {
        question: 'Is this calculator useful for freelance contract rates?',
        answer: 'Yes, it helps remote professionals and software engineers establish minimum hourly consulting rates based on their local monthly financial requirements.'
      }
    ],
    relatedSlugs: ['loan-calculator', 'emi-calculator', 'percentage-calculator']
  },
  {
    id: 'gpa',
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'Education',
    icon: 'GraduationCap',
    shortDescription: 'Calculate your semester GPA and cumulative CGPA using credit hours and letter grades.',
    metaTitle: 'GPA & CGPA Calculator - Pakistan University 4.0 Scale Tool',
    metaDescription: 'Calculate your semester Grade Point Average (GPA) and Cumulative CGPA easily on the 4.0 scale for Pakistani universities (NUST, FAST, LUMS, COMSATS, UET, PU).',
    h1: 'University GPA & CGPA Calculator',
    intro: 'Keep track of your academic standing with the Asan GPA & CGPA Calculator. Tailored for undergraduate and postgraduate students in Pakistan, supporting the standard 4.0 grading scale used by HEC-recognized institutions including NUST, FAST, LUMS, COMSATS, UET, GIKI, and Punjab University.',
    howToUse: [
      'Add your course subjects for the current semester.',
      'Select the credit hours (1, 2, 3, or 4) and achieved grade for each subject.',
      'Optionally enter your previous Cumulative CGPA and completed credit hours.',
      'Instantly view your semester GPA, total credit points earned, and updated CGPA.'
    ],
    formulas: [
      {
        title: 'Semester GPA Formula',
        expression: 'Semester GPA = ∑(Credit Hours × Grade Points) / ∑(Credit Hours)',
        explanation: 'Multiply each course credit by its grade value (e.g. A=4.0, B=3.0), sum the products, and divide by total semester credits.'
      },
      {
        title: 'Cumulative CGPA Formula',
        expression: 'CGPA = [(Previous CGPA × Previous Credits) + (Semester GPA × Semester Credits)] / Total Combined Credits',
        explanation: 'Weighted average across all semesters completed.'
      }
    ],
    example: {
      title: 'Example: 3 courses (Data Structures 3 cr [A], Calculus 3 cr [B+], Physics 4 cr [A-])',
      scenario: 'Evaluating semester performance for an engineering student.',
      steps: [
        'Data Structures (3 cr × 4.0 = 12.0 points)',
        'Calculus (3 cr × 3.33 = 9.99 points)',
        'Physics (4 cr × 3.67 = 14.68 points)',
        'Total Points = 36.67, Total Credits = 10',
        'GPA = 36.67 / 10 = 3.67'
      ],
      result: 'Semester GPA: 3.67 / 4.00.'
    },
    faqs: [
      {
        question: 'What is the minimum CGPA required for degrees in Pakistan?',
        answer: 'Most Pakistani universities require a minimum CGPA of 2.00 / 4.00 for undergraduate bachelor degrees and 2.50 or 3.00 for master/PhD programs.'
      },
      {
        question: 'How do F grades impact CGPA?',
        answer: 'An F grade awards 0.0 grade points but includes the credit hours in the denominator, which severely drops the semester GPA until the course is successfully repeated.'
      }
    ],
    relatedSlugs: ['percentage-to-marks-calculator', 'percentage-calculator', 'age-calculator']
  },
  {
    id: 'percentage-to-marks',
    slug: 'percentage-to-marks-calculator',
    name: 'Percentage to Marks Calculator',
    category: 'Education',
    icon: 'Award',
    shortDescription: 'Convert obtained marks and total marks to percentage, or find marks from a percentage target.',
    metaTitle: 'Percentage to Marks Calculator - Pakistani Board & Matric/FSc Grade',
    metaDescription: 'Convert obtained marks to percentage and academic grade. Supports Pakistani Matric, Intermediate (FSc/FA/ICS), and O/A Level grading systems.',
    h1: 'Percentage to Marks & Grade Calculator',
    intro: 'Calculate your academic percentage and letter grade from obtained and total exam marks. Designed specifically for Pakistani education boards (BISE Lahore, Karachi, Rawalpindi, Federal Board FBISE, Multan, Peshawar, etc.) for Matric, FSc, ICS, and University admissions.',
    howToUse: [
      'Enter the Total Maximum Marks for your exam (e.g. 1100 for Matric/FSc, or 500 for a semester).',
      'Enter the Marks you Obtained.',
      'View your accurate percentage to 2 decimal places and your official Pakistani Board Grade (A+, A, B, C, D, E, F).'
    ],
    formulas: [
      {
        title: 'Percentage Formula',
        expression: 'Percentage (%) = (Obtained Marks / Total Marks) × 100',
        explanation: 'Divide the points achieved by the maximum possible points and multiply by 100.'
      },
      {
        title: 'Pakistan BISE Grade Matrix',
        expression: '80% & Above: A+ (Outstanding)\n70% - 79.99%: A (Excellent)\n60% - 69.99%: B (Very Good)\n50% - 59.99%: C (Good)\n40% - 49.99%: D (Fair)\n33% - 39.99%: E (Pass)\nBelow 33%: F (Fail)',
        explanation: 'Official grade classification table adhered to by BISE boards across Pakistan.'
      }
    ],
    example: {
      title: 'Example: FSc Pre-Medical student scoring 946 marks out of 1100',
      scenario: 'Checking merit eligibility for medical college entrance in Punjab.',
      steps: [
        'Obtained Marks = 946, Total Marks = 1100',
        'Calculation = (946 / 1100) × 100 = 86.00%',
        'Grade Category = 86.00% ≥ 80% (Grade A+)'
      ],
      result: 'Percentage: 86.00% | Grade: A+ (Outstanding).'
    },
    faqs: [
      {
        question: 'What is the passing percentage in Pakistani educational boards?',
        answer: 'Under BISE and FBISE regulations, 33% is the traditional minimum passing threshold per subject and aggregate, though recent educational reforms are transitioning the standard to 40%.'
      },
      {
        question: 'Can I reverse calculate marks needed to achieve 85%?',
        answer: 'Yes, multiply the total marks by 0.85 (e.g. 1100 × 0.85 = 935 marks needed).'
      }
    ],
    relatedSlugs: ['gpa-calculator', 'percentage-calculator', 'discount-calculator']
  }
];

export const CATEGORIES: CalculatorCategory[] = [
  'Finance',
  'Health',
  'Education',
  'Math',
  'Unit Conversion',
  'Date & Time'
];
