const translations = {
  en: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      home: "Home",
      entrepreneurs: "Entrepreneurs",
      services: "Services",
      bankingServices: "Banking Services",
      insuranceServices: "Insurance Services",
      financialServices: "Financial Services",
      blog: "Blog",
      team: "Team",
      careers: "Careers",
      contactUs: "Contact Us",
      becomeAgent: "Become a BC Agent",
    },

    // ── Hero Section ─────────────────────────────────────────────────────────
    hero: {
      title: "Your Trusted Partner for Government & Banking Services",
    },

    // ── Hero Stats ───────────────────────────────────────────────────────────
    heroStats: [
      { suffix: "Years+", label: "Banking Experience" },
      { suffix: "States", label: "Pan India Presence" },
      { suffix: "K",      label: "CSP Branches" },
      { suffix: "K+",     label: "Value Customers" },
    ],

    // ── About UFS Section ────────────────────────────────────────────────────
    about: {
      eyebrow: "About UFS Digital",
      title: "Making Digital Services Clear, Fast, and Reliable",
      lead: "UFS Digital Limited is a citizen-first financial services platform helping people across India access banking and government services through guided support, digital workflows, and a strong on-ground network.",
      body: "We bridge traditional systems with modern convenience so account opening, digital payments, credit, loans, insurance, pensions, and scheme applications become faster, clearer, and more reliable for every community.",
      strips: [
        { title: "Banking Made Easy",    description: "Simple assisted banking at nearby CSP touchpoints." },
        { title: "Expert Assistance",    description: "Trained BC agents guide every step with clarity." },
        { title: "Connected Community",  description: "One trusted access point for financial services." },
      ],
    },

    // ── Our Business Section ─────────────────────────────────────────────────
    ourBusiness: {
      eyebrow: "Our Business",
      title: "Comprehensive Financial Solutions",
      services: [
        { title: "BFSI Financial Services", description: "Access banking, digital payments, insurance, and financial support through our trusted BFSI network.", tag: "Financial" },
        { title: "Motor Insurance",         description: "Reliable coverage, competitive premiums & hassle-free claims for every vehicle owner.", tag: "Insurance" },
        { title: "PAN Card Service",        description: "Quick, easy PAN card applications — delivered securely to your doorstep.", tag: "Government" },
        { title: "Wave OTT",               description: "Stream movies, shows, and live TV anytime through our affordable digital platform.", tag: "Entertainment" },
        { title: "Kisan4U Service",         description: "Connecting farmers and buyers — empowering agriculture marketing across India.", tag: "Agriculture" },
        { title: "UP MSME Mart",           description: "Quality products and exclusive deals for small businesses and everyday consumers.", tag: "Commerce" },
      ],
    },

    // ── BFSI Services Section ────────────────────────────────────────────────
    bfsi: {
      eyebrow: "What is BFSI?",
      title: "Comprehensive",
      titleHighlight: "BFSI",
      titleSuffix: "Services",
      subtitle: "We provide a wide range of Banking, Financial Services, and Insurance solutions designed to make everyday financial access simple and reliable. From account opening and digital payments to insurance and loan assistance, our services ensure convenience, transparency, and trust for individuals and businesses alike.",
      categories: [
        { title: "Banking & Payments",  items: ["Account Opening Assistance", "AEPS & Micro ATM Services", "Cash Deposit & Withdrawal", "UPI Setup & Bill Payments", "Mobile Recharge & FASTag"] },
        { title: "Financial Services",  items: ["PAN Card Services", "Credit Card Application", "Loan Assistance", "Mutual Fund Guidance", "EMI / Finance Support"] },
        { title: "Insurance Services",  items: ["Life Insurance Plans", "Health Insurance", "Vehicle Insurance", "Insurance Claim Assistance", "General Insurance Cover"] },
      ],
    },

    // ── Women Empowerment Section ────────────────────────────────────────────
    womenEmp: {
      eyebrow: "Woman Empowerment",
      title: "How BC SAKHIs Empower Women Entrepreneurs",
      quote: "BC SAKHIs play a pivotal role in offering various financial services like opening bank accounts, processing loans, facilitating insurance, and promoting digital transactions. They act as the first point of contact between the community and formal banking institutions.",
      features: ["Providing Access to Financial Services.", "Improving Financial Literacy.", "Fostering Entrepreneurship."],
    },

    // ── Impact Map Section ───────────────────────────────────────────────────
    impactMap: {
      eyebrow: "UFS Digital",
      title: "Empowering India Across",
      titleHighlight: "24 States",
      desc: "UFS Digital forms the technological backbone of rural India, bridging the gap between formal financial institutions and the unbanked. Our widespread network of CSP branches ensures that banking and digital services reach every corner of the country.",
      stats: [
        { value: "3.36K", label: "CSP Branches" },
        { value: "250K+", label: "Value Customers" },
      ],
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      desc: "We empower rural and urban communities with dependable banking, insurance, and financial services delivered through a trusted BC agent network.",
      servicesHeading: "Quick Links",
      pagesHeading: "Pages",
      contactHeading: "Contact",
      address: "7th floor, Summit Building, Vibhuti Khand, Gomti Nagar, Lucknow-226010, U.P.",
      copyright: "All Rights Reserved.",
      serviceLinks: [{ label: "Banking Services" }, { label: "Insurance Services" }, { label: "Financial Services" }],
      pageLinks: [{ label: "Home" }, { label: "Entrepreneurs" }, { label: "Blog" }, { label: "Careers" }, { label: "Contact Us" }],
    },

    // ── Entrepreneurs Page ───────────────────────────────────────────────────
    entrepreneurs: {
      // PageIntro
      intro: {
        eyebrow: "Opportunity",
        heading: "Build a trusted business that creates local financial access",
        paragraphs: [
          "Banking Correspondents are becoming the bridge between formal financial services and underserved communities. As an entrepreneur, you can provide everyday banking assistance while building a strong, respected income source.",
          "From cash withdrawal and account support to insurance and loan assistance, this model helps you create impact and economic independence at the same time.",
        ],
      },
      // WhyBecomeAgentSection
      whyJoin: {
        eyebrow: "Why Join",
        title: "Why Become a",
        titleHighlight: "BC Agent?",
        body: "Becoming a Business Correspondent Agent, often known as a CSP operator, gives you a practical way to build income, local trust, digital skills, and social impact by bringing formal banking closer to rural and underbanked communities. With minimal investment and flexible working hours, you can start your own service point and grow a sustainable income stream while serving your community.",
        cards: [
          { title: "Steady & Scalable Income Stream",         text: "Earn commissions on account opening, deposits, withdrawals, fund transfers, loan support, insurance, pensions, and other assisted services." },
          { title: "Low-Cost Business Opportunity",           text: "Start from an existing shop, kiosk, or local service point with a low-investment model and flexible daily operations." },
          { title: "Community Trust & Recognition",           text: "Become the trusted local banking contact for your area and help people avoid long travel for everyday financial work." },
          { title: "Personal & Professional Growth",          text: "Build practical skills in customer service, basic finance, Micro ATM, AEPS, biometric devices, and assisted banking apps." },
          { title: "Financial Services & Inclusion Impact",   text: "Support underbanked families, women, farmers, and workers by bringing banking, insurance, pension, and benefit access closer." },
          { title: "Regional & Community Growth Potential",   text: "Expand from daily transactions into a dependable local service network as more people in your region start using your touchpoint." },
        ],
      },
      // AgentServicesSection
      agentServices: {
        eyebrow: "Services",
        title: "Services You Will Provide",
        cards: [
          { title: "Banking Services",    tag: "Banking",   description: "Open accounts, support cash deposits and withdrawals, handle balance inquiry, and process AEPS transactions." },
          { title: "Digital Payments",    tag: "Payments",  description: "Help customers use UPI, bill payments, mobile recharge, money transfer, and everyday assisted digital payments." },
          { title: "Micro ATM & AEPS",    tag: "Access",    description: "Use biometric devices and Micro ATM tools to make cash access easier for rural and underbanked communities." },
          { title: "Financial Services",  tag: "Finance",   description: "Assist with PAN card services, loan support, credit card processing, EMI help, and basic financial guidance." },
          { title: "Insurance Services",  tag: "Insurance", description: "Support customers with life, health, and vehicle insurance plans, renewals, and claim assistance." },
          { title: "Government Benefit",  tag: "G2C",       description: "Guide people through pension, DBT, scheme-linked services, and government-to-citizen support workflows." },
        ],
      },
      // StartJourneySection
      startJourney: {
        eyebrow: "How It Works",
        title: "Start Your",
        titleHighlight: "Journey",
        titleSuffix: "in 4 Simple Steps",
        body: "Move from registration to earning with a clear onboarding path, guided verification, practical training, and the right tools to serve customers confidently from your local service point.",
        steps: [
          { title: "Register Online" },
          { title: "Verification" },
          { title: "Training & Setup" },
          { title: "Start Earning" },
        ],
        eligibilityEyebrow: "Eligibility",
        eligibilityTitle: "Who Can Apply?",
        eligibilityPoints: [
          "Minimum 10th/12th pass qualification",
          "Basic smartphone and app usage knowledge",
          "Aadhaar card and PAN card availability",
          "Small investment capability for setup",
          "Strong willingness to serve the community",
        ],
      },
      // EarningsGrowthSection
      earningsGrowth: {
        eyebrow: "Earnings & Growth",
        title: "Your Earnings, Growth Impact Across India",
        quote: "Build a recurring income engine with assisted banking and financial services. As your customer base grows, your local service point can create income, community trust, and reliable access for people across underserved regions.",
        highlights: [
          { title: "Rs 10K-Rs 50K+ monthly earning potential" },
          { title: "Empowering thousands of local entrepreneurs" },
          { title: "Extending banking access to remote areas" },
          { title: "Supporting the Digital India mission on the ground" },
        ],
      },
      // TestimonialsSection
      testimonials: {
        eyebrow: "Success Stories",
        title: "Entrepreneurs are already creating change",
        items: [
          {
            quote: "My name is Priyanka Singh and I live in Bahurawa, a small village near Sultanpur. Earlier, reaching a bank was very difficult for people in our village. After the BC Sakhi service started, we got support for account opening, cash deposit, cash withdrawal, and business loan assistance in our own village. It has helped our village grow and made daily life easier.",
            name: "Priyanka Singh",
            role: "Bahurawa, Sultanpur",
          },
          {
            quote: "My name is Mohammad Rashid. I have been working as a Banking Mitra with Punjab National Bank for the last two years. This work has given me a steady and trusted income. I earn commission on account opening, transactions, and financial products. This income has helped my family, my children's education, and our standard of living.",
            name: "Mohammad Rashid",
            role: "Banking Mitra, Punjab National Bank",
          },
          {
            quote: "As a Banking Mitra, I feel proud that I am also doing social service. I help people in my village apply for Aadhaar, PAN card, Kisan Credit Card, and other schemes. I also guide them about e-banking, mobile banking, and digital payments, so they can use banking services with more confidence.",
            name: "Ram Balak",
            role: "BC, UCO Bank",
          },
          {
            quote: "I work as a Bank Mitra and I want to share my experience. This work has given me more respect in society and also made me a partner in basic social service. I help people in my village apply for Aadhaar, PAN card, Kisan Credit Card, and other schemes. I also teach them about e-banking, mobile banking, and digital payments.",
            name: "Gulab Chandra",
            role: "BC, Bank of Baroda",
          },
        ],
      },
      // CTA section
      cta: {
        title: "Start Your",
        titleHighlight: "Entrepreneur",
        titleSuffix: "Journey Today",
        applyNow: "Apply Now",
        contactUs: "Contact Us",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  HINDI
  // ════════════════════════════════════════════════════════════════════════════
  hi: {
    // ── Navbar ──────────────────────────────────────────────────────────────
    nav: {
      home: "होम",
      entrepreneurs: "उद्यमी",
      services: "सेवाएं",
      bankingServices: "बैंकिंग सेवाएं",
      insuranceServices: "बीमा सेवाएं",
      financialServices: "वित्तीय सेवाएं",
      blog: "ब्लॉग",
      team: "टीम",
      careers: "करियर",
      contactUs: "संपर्क करें",
      becomeAgent: "BC एजेंट बनें",
    },

    // ── Hero Section ─────────────────────────────────────────────────────────
    hero: {
      title: "सरकारी और बैंकिंग सेवाओं के लिए आपका विश्वसनीय साथी",
    },

    // ── Hero Stats ───────────────────────────────────────────────────────────
    heroStats: [
      { suffix: "वर्ष+",  label: "बैंकिंग अनुभव" },
      { suffix: "राज्य", label: "अखिल भारत उपस्थिति" },
      { suffix: "K",      label: "CSP शाखाएं" },
      { suffix: "K+",     label: "मूल्यवान ग्राहक" },
    ],

    // ── About UFS Section ────────────────────────────────────────────────────
    about: {
      eyebrow: "UFS डिजिटल के बारे में",
      title: "डिजिटल सेवाएं स्पष्ट, तेज़ और विश्वसनीय बनाना",
      lead: "UFS डिजिटल लिमिटेड एक नागरिक-प्रथम वित्तीय सेवा प्लेटफ़ॉर्म है जो गाइडेड सपोर्ट, डिजिटल वर्कफ़्लो और मज़बूत ज़मीनी नेटवर्क के ज़रिए पूरे भारत में लोगों को बैंकिंग और सरकारी सेवाओं तक पहुंच दिलाता है।",
      body: "हम पारंपरिक प्रणालियों को आधुनिक सुविधा से जोड़ते हैं ताकि खाता खोलना, डिजिटल भुगतान, क्रेडिट, लोन, बीमा, पेंशन और योजना आवेदन हर समुदाय के लिए तेज़, स्पष्ट और अधिक विश्वसनीय बन सकें।",
      strips: [
        { title: "बैंकिंग हुई आसान",    description: "नज़दीकी CSP केंद्रों पर सरल सहायता प्राप्त बैंकिंग।" },
        { title: "विशेषज्ञ सहायता",      description: "प्रशिक्षित BC एजेंट हर कदम पर स्पष्टता से मार्गदर्शन करते हैं।" },
        { title: "जुड़ा हुआ समुदाय",     description: "वित्तीय सेवाओं के लिए एकमात्र विश्वसनीय पहुंच केंद्र।" },
      ],
    },

    // ── Our Business Section ─────────────────────────────────────────────────
    ourBusiness: {
      eyebrow: "हमारा व्यवसाय",
      title: "व्यापक वित्तीय समाधान",
      services: [
        { title: "BFSI वित्तीय सेवाएं", description: "हमारे विश्वसनीय BFSI नेटवर्क के माध्यम से बैंकिंग, डिजिटल भुगतान, बीमा और वित्तीय सहायता प्राप्त करें।", tag: "वित्तीय" },
        { title: "मोटर बीमा",            description: "प्रत्येक वाहन मालिक के लिए विश्वसनीय कवरेज, प्रतिस्पर्धी प्रीमियम और आसान क्लेम।", tag: "बीमा" },
        { title: "PAN कार्ड सेवा",       description: "त्वरित और आसान PAN कार्ड आवेदन — सुरक्षित रूप से आपके दरवाज़े तक डिलीवर।", tag: "सरकारी" },
        { title: "Wave OTT",             description: "हमारे किफायती डिजिटल प्लेटफ़ॉर्म के ज़रिए कभी भी फिल्में, शो और लाइव टीवी देखें।", tag: "मनोरंजन" },
        { title: "किसान4U सेवा",          description: "किसानों और खरीदारों को जोड़ना — पूरे भारत में कृषि विपणन को सशक्त बनाना।", tag: "कृषि" },
        { title: "UP MSME मार्ट",         description: "छोटे व्यवसायों और रोज़मर्रा के उपभोक्ताओं के लिए गुणवत्ता उत्पाद और विशेष सौदे।", tag: "वाणिज्य" },
      ],
    },

    // ── BFSI Services Section ────────────────────────────────────────────────
    bfsi: {
      eyebrow: "BFSI क्या है?",
      title: "व्यापक",
      titleHighlight: "BFSI",
      titleSuffix: "सेवाएं",
      subtitle: "हम बैंकिंग, वित्तीय सेवाओं और बीमा समाधानों की एक विस्तृत श्रृंखला प्रदान करते हैं जो रोज़मर्रा की वित्तीय पहुंच को सरल और विश्वसनीय बनाने के लिए डिज़ाइन की गई हैं। खाता खोलने और डिजिटल भुगतान से लेकर बीमा और ऋण सहायता तक, हमारी सेवाएं व्यक्तियों और व्यवसायों दोनों के लिए सुविधा, पारदर्शिता और विश्वास सुनिश्चित करती हैं।",
      categories: [
        { title: "बैंकिंग और भुगतान", items: ["खाता खोलने में सहायता", "AEPS और माइक्रो ATM सेवाएं", "नकद जमा और निकासी", "UPI सेटअप और बिल भुगतान", "मोबाइल रिचार्ज और FASTag"] },
        { title: "वित्तीय सेवाएं",   items: ["PAN कार्ड सेवाएं", "क्रेडिट कार्ड आवेदन", "ऋण सहायता", "म्यूचुअल फंड मार्गदर्शन", "EMI / वित्त सहायता"] },
        { title: "बीमा सेवाएं",      items: ["जीवन बीमा योजनाएं", "स्वास्थ्य बीमा", "वाहन बीमा", "बीमा क्लेम सहायता", "सामान्य बीमा कवर"] },
      ],
    },

    // ── Women Empowerment Section ────────────────────────────────────────────
    womenEmp: {
      eyebrow: "महिला सशक्तिकरण",
      title: "BC SAKHIs महिला उद्यमियों को कैसे सशक्त बनाती हैं",
      quote: "BC SAKHIs बैंक खाते खोलना, ऋण प्रसंस्करण, बीमा सुविधा और डिजिटल लेनदेन को बढ़ावा देने जैसी विभिन्न वित्तीय सेवाएं प्रदान करने में महत्वपूर्ण भूमिका निभाती हैं। वे समुदाय और औपचारिक बैंकिंग संस्थाओं के बीच संपर्क का पहला बिंदु हैं।",
      features: ["वित्तीय सेवाओं तक पहुंच प्रदान करना।", "वित्तीय साक्षरता में सुधार।", "उद्यमिता को बढ़ावा देना।"],
    },

    // ── Impact Map Section ───────────────────────────────────────────────────
    impactMap: {
      eyebrow: "UFS डिजिटल",
      title: "भारत को सशक्त बना रहे हैं",
      titleHighlight: "24 राज्यों में",
      desc: "UFS डिजिटल ग्रामीण भारत की तकनीकी रीढ़ बनाता है, औपचारिक वित्तीय संस्थाओं और बैंकिंग से वंचित लोगों के बीच की खाई को पाटता है। CSP शाखाओं का हमारा व्यापक नेटवर्क सुनिश्चित करता है कि बैंकिंग और डिजिटल सेवाएं देश के हर कोने तक पहुंचें।",
      stats: [
        { value: "3.36K", label: "CSP शाखाएं" },
        { value: "250K+", label: "मूल्यवान ग्राहक" },
      ],
    },

    // ── Footer ───────────────────────────────────────────────────────────────
    footer: {
      desc: "हम ग्रामीण और शहरी समुदायों को विश्वसनीय बैंकिंग, बीमा और वित्तीय सेवाओं से सशक्त बनाते हैं, जो एक भरोसेमंद BC एजेंट नेटवर्क के ज़रिए प्रदान की जाती हैं।",
      servicesHeading: "क्विक लिंक्स",
      pagesHeading: "पेज",
      contactHeading: "संपर्क",
      address: "7वीं मंजिल, समिट बिल्डिंग, विभूति खंड, गोमती नगर, लखनऊ-226010, उ.प्र.",
      copyright: "सर्वाधिकार सुरक्षित।",
      serviceLinks: [{ label: "बैंकिंग सेवाएं" }, { label: "बीमा सेवाएं" }, { label: "वित्तीय सेवाएं" }],
      pageLinks: [{ label: "होम" }, { label: "उद्यमी" }, { label: "ब्लॉग" }, { label: "करियर" }, { label: "संपर्क करें" }],
    },

    // ── Entrepreneurs Page ───────────────────────────────────────────────────
    entrepreneurs: {
      // PageIntro
      intro: {
        eyebrow: "अवसर",
        heading: "एक विश्वसनीय व्यवसाय बनाएं जो स्थानीय वित्तीय पहुंच बनाए",
        paragraphs: [
          "बैंकिंग कॉरेस्पॉन्डेंट औपचारिक वित्तीय सेवाओं और वंचित समुदायों के बीच सेतु बन रहे हैं। एक उद्यमी के रूप में, आप रोज़मर्रा की बैंकिंग सहायता प्रदान करते हुए एक मज़बूत और सम्मानजनक आय स्रोत बना सकते हैं।",
          "नकद निकासी और खाता सहायता से लेकर बीमा और ऋण सहायता तक, यह मॉडल आपको एक साथ प्रभाव और आर्थिक स्वतंत्रता बनाने में मदद करता है।",
        ],
      },
      // WhyBecomeAgentSection
      whyJoin: {
        eyebrow: "क्यों जुड़ें",
        title: "BC एजेंट क्यों",
        titleHighlight: "बनें?",
        body: "बिज़नेस कॉरेस्पॉन्डेंट एजेंट बनना, जिसे अक्सर CSP ऑपरेटर कहा जाता है, आपको औपचारिक बैंकिंग को ग्रामीण और वंचित समुदायों के करीब लाकर आय, स्थानीय विश्वास, डिजिटल कौशल और सामाजिक प्रभाव बनाने का व्यावहारिक तरीका देता है। न्यूनतम निवेश और लचीले कार्य घंटों के साथ, आप अपना सर्विस पॉइंट शुरू कर सकते हैं और अपने समुदाय की सेवा करते हुए एक टिकाऊ आय धारा विकसित कर सकते हैं।",
        cards: [
          { title: "स्थिर और स्केलेबल आय धारा",          text: "खाता खोलने, जमा, निकासी, फंड ट्रांसफर, ऋण सहायता, बीमा, पेंशन और अन्य सहायक सेवाओं पर कमीशन कमाएं।" },
          { title: "कम लागत वाला व्यावसायिक अवसर",        text: "मौजूदा दुकान, कियोस्क या स्थानीय सर्विस पॉइंट से कम निवेश मॉडल और लचीले दैनिक संचालन के साथ शुरू करें।" },
          { title: "सामुदायिक विश्वास और पहचान",           text: "अपने क्षेत्र का विश्वसनीय स्थानीय बैंकिंग संपर्क बनें और लोगों को रोज़मर्रा के वित्तीय काम के लिए लंबी यात्रा से बचाएं।" },
          { title: "व्यक्तिगत और व्यावसायिक विकास",        text: "ग्राहक सेवा, बुनियादी वित्त, माइक्रो ATM, AEPS, बायोमेट्रिक डिवाइस और सहायक बैंकिंग ऐप्स में व्यावहारिक कौशल बनाएं।" },
          { title: "वित्तीय सेवाएं और समावेशन प्रभाव",     text: "बैंकिंग, बीमा, पेंशन और लाभ पहुंच को नज़दीक लाकर वंचित परिवारों, महिलाओं, किसानों और श्रमिकों का समर्थन करें।" },
          { title: "क्षेत्रीय और सामुदायिक विकास क्षमता",  text: "जैसे-जैसे आपके क्षेत्र में अधिक लोग आपके टचपॉइंट का उपयोग करने लगें, दैनिक लेनदेन से एक विश्वसनीय स्थानीय सेवा नेटवर्क में विस्तार करें।" },
        ],
      },
      // AgentServicesSection
      agentServices: {
        eyebrow: "सेवाएं",
        title: "आप जो सेवाएं प्रदान करेंगे",
        cards: [
          { title: "बैंकिंग सेवाएं",     tag: "बैंकिंग",   description: "खाते खोलें, नकद जमा और निकासी में सहायता करें, बैलेंस इन्क्वायरी संभालें और AEPS लेनदेन प्रोसेस करें।" },
          { title: "डिजिटल भुगतान",       tag: "भुगतान",    description: "ग्राहकों को UPI, बिल भुगतान, मोबाइल रिचार्ज, मनी ट्रांसफर और रोज़मर्रा के सहायक डिजिटल भुगतान में मदद करें।" },
          { title: "माइक्रो ATM और AEPS",  tag: "पहुंच",     description: "ग्रामीण और वंचित समुदायों के लिए नकद पहुंच आसान बनाने के लिए बायोमेट्रिक डिवाइस और माइक्रो ATM टूल्स का उपयोग करें।" },
          { title: "वित्तीय सेवाएं",       tag: "वित्त",     description: "PAN कार्ड सेवाओं, ऋण सहायता, क्रेडिट कार्ड प्रोसेसिंग, EMI सहायता और बुनियादी वित्तीय मार्गदर्शन में मदद करें।" },
          { title: "बीमा सेवाएं",          tag: "बीमा",      description: "जीवन, स्वास्थ्य और वाहन बीमा योजनाओं, नवीनीकरण और क्लेम सहायता में ग्राहकों का समर्थन करें।" },
          { title: "सरकारी लाभ",           tag: "G2C",       description: "पेंशन, DBT, योजना-संबद्ध सेवाओं और सरकार-से-नागरिक सहायता वर्कफ़्लो के माध्यम से लोगों का मार्गदर्शन करें।" },
        ],
      },
      // StartJourneySection
      startJourney: {
        eyebrow: "यह कैसे काम करता है",
        title: "अपनी",
        titleHighlight: "यात्रा",
        titleSuffix: "4 सरल चरणों में शुरू करें",
        body: "एक स्पष्ट ऑनबोर्डिंग पथ, गाइडेड वेरिफिकेशन, व्यावहारिक प्रशिक्षण और सही टूल्स के साथ पंजीकरण से कमाई तक आगे बढ़ें — अपने स्थानीय सर्विस पॉइंट से ग्राहकों की आत्मविश्वास के साथ सेवा करें।",
        steps: [
          { title: "ऑनलाइन पंजीकरण" },
          { title: "वेरिफिकेशन" },
          { title: "प्रशिक्षण और सेटअप" },
          { title: "कमाई शुरू करें" },
        ],
        eligibilityEyebrow: "पात्रता",
        eligibilityTitle: "कौन आवेदन कर सकता है?",
        eligibilityPoints: [
          "न्यूनतम 10वीं/12वीं पास योग्यता",
          "बुनियादी स्मार्टफोन और ऐप उपयोग का ज्ञान",
          "आधार कार्ड और PAN कार्ड उपलब्धता",
          "सेटअप के लिए छोटी निवेश क्षमता",
          "समुदाय की सेवा करने की दृढ़ इच्छाशक्ति",
        ],
      },
      // EarningsGrowthSection
      earningsGrowth: {
        eyebrow: "कमाई और विकास",
        title: "आपकी कमाई, पूरे भारत में विकास प्रभाव",
        quote: "सहायक बैंकिंग और वित्तीय सेवाओं के साथ एक आवर्ती आय इंजन बनाएं। जैसे-जैसे आपका ग्राहक आधार बढ़ता है, आपका स्थानीय सर्विस पॉइंट वंचित क्षेत्रों के लोगों के लिए आय, सामुदायिक विश्वास और विश्वसनीय पहुंच बना सकता है।",
        highlights: [
          { title: "₹10K-₹50K+ मासिक कमाई की संभावना" },
          { title: "हज़ारों स्थानीय उद्यमियों को सशक्त बनाना" },
          { title: "दूरदराज के क्षेत्रों तक बैंकिंग पहुंच बढ़ाना" },
          { title: "ज़मीनी स्तर पर डिजिटल इंडिया मिशन का समर्थन" },
        ],
      },
      // TestimonialsSection
      testimonials: {
        eyebrow: "सफलता की कहानियां",
        title: "उद्यमी पहले से ही बदलाव ला रहे हैं",
        items: [
          {
            quote: "मेरा नाम प्रियंका सिंह है और मैं सुल्तानपुर के पास एक छोटे से गांव बहुरावां में रहती हूं। पहले हमारे गांव के लोगों के लिए बैंक तक पहुंचना बहुत मुश्किल था। BC सखी सेवा शुरू होने के बाद, हमें अपने ही गांव में खाता खोलने, नकद जमा, नकद निकासी और व्यावसायिक ऋण सहायता मिली। इससे हमारे गांव को बढ़ने में मदद मिली और दैनिक जीवन आसान हो गया।",
            name: "प्रियंका सिंह",
            role: "बहुरावां, सुल्तानपुर",
          },
          {
            quote: "मेरा नाम मोहम्मद राशिद है। मैं पिछले दो साल से पंजाब नेशनल बैंक के साथ बैंकिंग मित्र के रूप में काम कर रहा हूं। इस काम ने मुझे एक स्थिर और विश्वसनीय आय दी है। मैं खाता खोलने, लेनदेन और वित्तीय उत्पादों पर कमीशन कमाता हूं। इस आय ने मेरे परिवार, बच्चों की शिक्षा और हमारे जीवन स्तर में मदद की है।",
            name: "मोहम्मद राशिद",
            role: "बैंकिंग मित्र, पंजाब नेशनल बैंक",
          },
          {
            quote: "बैंकिंग मित्र के रूप में, मुझे गर्व है कि मैं सामाजिक सेवा भी कर रहा हूं। मैं अपने गांव के लोगों को आधार, PAN कार्ड, किसान क्रेडिट कार्ड और अन्य योजनाओं के लिए आवेदन करने में मदद करता हूं। मैं उन्हें e-बैंकिंग, मोबाइल बैंकिंग और डिजिटल भुगतान के बारे में भी मार्गदर्शन देता हूं, ताकि वे अधिक आत्मविश्वास के साथ बैंकिंग सेवाओं का उपयोग कर सकें।",
            name: "राम बालक",
            role: "BC, UCO बैंक",
          },
          {
            quote: "मैं बैंक मित्र के रूप में काम करता हूं और अपना अनुभव साझा करना चाहता हूं। इस काम ने मुझे समाज में और अधिक सम्मान दिलाया है और मुझे बुनियादी सामाजिक सेवा में भागीदार भी बनाया है। मैं अपने गांव के लोगों को आधार, PAN कार्ड, किसान क्रेडिट कार्ड और अन्य योजनाओं के लिए आवेदन करने में मदद करता हूं।",
            name: "गुलाब चंद्रा",
            role: "BC, बैंक ऑफ बड़ौदा",
          },
        ],
      },
      // CTA section
      cta: {
        title: "अपनी",
        titleHighlight: "उद्यमी",
        titleSuffix: "यात्रा आज शुरू करें",
        applyNow: "अभी आवेदन करें",
        contactUs: "संपर्क करें",
      },
    },
  },
};

export default translations;
