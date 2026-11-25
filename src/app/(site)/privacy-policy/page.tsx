import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Movyo Health",
  description: "Review the privacy policy for using Movyo Health services and website.",
};

const sections: { id: string; title: string; body: string[]; isPlain?: boolean; reducedMargin?: boolean }[] = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    body: [
      "We collect several types of information from Platform users. Personal Information includes identifiers (name, email, address, phone number, username, IP address, device ID), account information (login credentials, preferences), demographic information (age, date of birth, gender, occupation, income), financial information (payment card details, billing address), location information (IP-based location, precise geolocation with consent), and communications (emails, phone calls, texts, chat messages). Health Information includes medical history and current conditions, medications and allergies, vital signs and biometric data (height, weight, blood pressure), treatment goals and preferences, diagnostic test results, clinical notes and progress information, and information exchanged with healthcare providers. Health information that constitutes PHI under HIPAA is governed by our separate Notice of Privacy Practices. Usage and Technical Information includes device information (device type, operating system, browser type, mobile device ID), usage data (pages visited, time spent, links clicked, search queries, referring/exit pages), connection information (IP address, ISP, browser version), and performance data (error reports, diagnostic data, crash logs). Cookies and Tracking Technologies include cookies (session and persistent), web beacons and pixel tags, device fingerprinting, and local storage. See Section 4 for details. Information from Third Parties includes information from medical providers (BELUGA HEALTH and contracted practitioners), pharmacies, payment processors (Stripe and others), marketing partners (analytics and advertising networks), social media platforms, and referral sources. Voluntary Information includes data you provide when registering, completing medical intake forms, purchasing products or services, communicating with support, participating in surveys or promotions, submitting reviews or testimonials, subscribing to newsletters, interacting with AI care coaching, or participating in community features.",
    ],
  },
  {
    id: "how-we-collect",
    title: "2. How We Collect Information",
    body: [
      "We collect information directly from you when you create accounts, complete forms, make purchases, provide payment information, communicate with us, or consent to collection for specific purposes. We collect information automatically through cookies and tracking technologies, web server logs, mobile device sensors (with permission), and analytics tools and services. We collect information from third-party sources including healthcare providers who treat you through the Platform, pharmacies that dispense medications, payment processors handling transactions, marketing and analytics partners, and publicly available sources.",
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    body: [
      "We use collected information to provide services including account management, service delivery (GLP-1 medications, AI care coaching, educational content, wellness features), transaction processing (payments, order fulfillment, subscription management), communication (transactional messages about accounts, orders, appointments, services), and customer support (inquiries, issue resolution, technical support). We use information for healthcare operations including treatment coordination (sharing with BELUGA HEALTH providers and pharmacies), care coaching (AI-powered guidance, support, educational content), progress tracking (monitoring wellness journey, personalized recommendations), and quality improvement (analyzing effectiveness, improving healthcare delivery). We use information to improve the Platform through development (developing, testing, improving features), user experience (personalizing content and recommendations), performance monitoring (analyzing usage, identifying technical issues, optimizing performance), and research and analytics (creating de-identified, aggregated data). We use information for marketing and communications including promotional emails, texts, and notifications (with consent where required), personalized advertising (targeted ads based on interests), surveys and feedback (requesting opinions), and newsletters (educational content, health and wellness updates). We use information for safety and legal compliance including security (detecting, preventing, investigating fraud and unauthorized access), legal obligations (complying with laws, regulations, legal processes, government requests), policy enforcement (enforcing Terms & Conditions and policies), and rights protection (protecting rights, property, safety of MoVyo Health, users, and the public). We may also use information with your consent for purposes disclosed at collection or where we obtain explicit consent.",
    ],
  },
  {
    id: "cookies-tracking",
    title: "4. Cookies and Tracking Technologies",
    body: [
      "Cookies are small text files stored on your device that help us recognize you, remember preferences, and improve your experience. We use session cookies (expire when you close your browser) and persistent cookies (remain until deleted). We use essential cookies (required for Platform functionality including security, authentication, session management), performance cookies (collect information about Platform use to improve performance), functionality cookies (remember preferences and choices for enhanced features), advertising cookies (track browsing habits to deliver relevant ads, may be set by us or third-party partners), and analytics cookies (understand visitor interaction through Google Analytics and similar services). Other tracking technologies include web beacons or pixel tags (small graphic images in web pages or emails tracking whether you have viewed content), device fingerprinting (identifies your device based on unique configuration characteristics, cannot be easily deleted like cookies), and local storage (HTML5 local storage and similar technologies storing data on your device). You can manage cookies through browser settings (most browsers allow you to refuse cookies or alert you when cookies are sent, though some Platform parts may not function without cookies) and opt-out tools including Google Analytics (https://tools.google.com/dlpage/gaoptout), Network Advertising Initiative (http://www.networkadvertising.org/choices/), and Digital Advertising Alliance (http://www.aboutads.info/choices/). We currently do not respond to Do Not Track (DNT) browser signals but honor Global Privacy Control (GPC) signals where required by law. Third parties such as Google, Facebook, and advertising networks may set cookies on our Platform. We do not control these cookies. Review their privacy policies to understand how they use your information.",
    ],
  },
  {
    id: "how-we-share",
    title: "5. How We Share Your Information",
    body: [
      "We share information with healthcare providers including BELUGA HEALTH (we share health information with BELUGA HEALTH and contracted physicians and practitioners providing medical services through the Platform), pharmacies (we share prescription and health information with licensed pharmacies dispensing medications), and lab and diagnostic services (when necessary for care, we share information with laboratories and testing companies). We share information with service providers who perform functions on our behalf including payment processors (Stripe and other payment gateways to process transactions), cloud hosting (AWS, Google Cloud, or similar providers for data storage and hosting), communication services (email, SMS, notification providers), AI and technology partners (providers of AI care coaching technology and analytics tools), customer support (third-party customer service platforms), and marketing services (email marketing platforms, advertising networks, analytics providers). These service providers are contractually required to protect your information and may only use it to provide services to us. We share information for business purposes with affiliates and subsidiaries (our parent company, subsidiaries, and affiliated entities for business operations and service provision), business transfers (in the event of merger, acquisition, bankruptcy, reorganization, or sale of assets, your information may be transferred to the successor entity), and professional advisors (lawyers, accountants, auditors, and other professional advisors as necessary). We share information for legal reasons when we believe it is necessary to comply with laws, regulations, legal processes, or government requests, respond to subpoenas, court orders, or legal demands, enforce our Terms & Conditions, policies, and agreements, protect rights, property, safety, or security of MoVyo Health, users, or the public, and detect, prevent, or investigate fraud, security breaches, or illegal activity. We share information with your consent when you give us explicit consent to do so. We may share de-identified and aggregated data that cannot reasonably identify you including statistical data about Platform usage, demographics, and trends. This type of information is not subject to Privacy Policy restrictions. If you post content in public areas of the Platform (reviews, testimonials, community features), that information may be viewed, collected, and used by others. Exercise caution when sharing information publicly.",
    ],
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    body: [
      "We retain your Personal Information as long as necessary to fulfill purposes described in this Privacy Policy unless a longer retention period is required or permitted by law. Account information is retained while your account is active and for a reasonable period thereafter (typically 7 years after account closure). Transaction records are retained for 7 years from transaction date for accounting, legal, and regulatory purposes. Medical information is retained in accordance with healthcare record retention laws (typically 7-10 years). Marketing data is retained until you opt out or request deletion, plus a retention period to honor your opt-out preference. Legal and compliance records are retained as required by law or for legitimate business purposes (typically 7 years). Cookies and technical data are automatically deleted or anonymized within 5 years of collection. When we no longer need your information, we delete it or anonymize it so it can no longer identify you. Some information may be retained in backup systems for a limited time before permanent deletion.",
    ],
  },
  {
    id: "privacy-rights",
    title: "7. Your Privacy Rights and Choices",
    body: [
      "You have the right to access and update your Personal Information by logging into account settings or contacting hi@movyohealth.com. You can manage marketing communications by unsubscribing from email marketing (click the unsubscribe link in emails or contact hi@movyohealth.com), opting out of text messages (reply STOP to any text), and disabling push notifications (disable in device settings). Note that you cannot opt out of transactional communications related to your account and services. You can manage cookies and tracking through browser settings, our cookie preference center (if available), and third-party opt-out tools referenced in Section 4. You may request deletion of your account and Personal Information by contacting hi@movyohealth.com or following account deletion instructions in account settings. We will delete your information in accordance with applicable laws, except where we must retain it for legal, regulatory, or legitimate business purposes.",
    ],
  },
  {
    id: "state-rights",
    title: "8. State-Specific Privacy Rights",
    body: [
      "California Residents (CCPA/CPRA): If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). In the past 12 months, we collected the following categories of Personal Information: identifiers (name, email, address, phone, IP address, device ID, online identifiers), protected classifications (age, gender, health information), commercial information (purchase history, subscription data), financial information (payment card details, billing information), biometric information (health metrics, weight, vital signs), internet activity (browsing history, search queries, Platform interaction), geolocation data (approximate and precise location), professional information (occupation), and inferences (preferences, characteristics, behavior predictions). We use your Personal Information for providing services and processing transactions, personalizing your experience, marketing and advertising, analytics and research, security and fraud prevention, and legal compliance. We share Personal Information with service providers (payment processors, cloud hosting, analytics, marketing services), healthcare providers (BELUGA HEALTH, contracted physicians, pharmacies), advertising networks (for targeted advertising), and business partners as described in Section 5. California Privacy Rights include the right to know (request information about Personal Information we collect, use, and disclose about you), right to access (request a copy of specific pieces of Personal Information we have about you), right to delete (request deletion of your Personal Information, subject to exceptions), right to correct (request correction of inaccurate Personal Information), right to opt-out of sale/sharing (we do not \"sell\" your Personal Information in the traditional sense, but CCPA broadly defines \"sale\" and \"sharing\" to include certain advertising practices; opt out by clicking \"Do Not Sell or Share My Personal Information\" in our website footer, enabling Global Privacy Control (GPC) in your browser, or contacting hi@movyohealth.com), right to limit use of sensitive personal information (you have the right to limit use, however, we only use such information for permitted purposes under CCPA), and right to non-discrimination (we will not discriminate against you for exercising privacy rights). California\u2019s Shine the Light law allows California residents to request information about Personal Information disclosed to third parties for direct marketing purposes in the prior calendar year. To exercise California privacy rights, email hi@movyohealth.com with \"California Privacy Rights\" in the subject line, provide your name, email address, and description of your request. We will verify your identity before processing requests by asking you to verify information we have on file, such as confirming your email address or answering security questions. You may designate an authorized agent to make requests on your behalf. The agent must provide proof of authorization. We will respond to verified requests within 45 days, with a possible 45-day extension if needed. Section 8 does not apply to PHI governed by HIPAA, medical information governed by California Confidentiality of Medical Information Act (CMIA), or information covered by other federal privacy laws. For information covered by HIPAA, see our Notice of Privacy Practices.",
      "Virginia Residents (VCDPA): Virginia residents have rights similar to California residents under the Virginia Consumer Data Protection Act, including rights to access, correct, delete, and opt out of certain data processing activities.",
      "Colorado Residents (CPA): Colorado residents have rights under the Colorado Privacy Act similar to those described for California and Virginia residents.",
      "Connecticut Residents (CTDPA): Connecticut residents have privacy rights under the Connecticut Data Privacy Act similar to those described above.",
      "Utah Residents (UCPA): Utah residents have certain rights under the Utah Consumer Privacy Act, including rights to access, delete, and opt out.",
      "Other States: If you reside in a state with comprehensive privacy laws not listed above, you may have similar rights. Contact hi@movyohealth.com to inquire about your rights.",
    ],
  },
  {
    id: "data-security",
    title: "9. Data Security",
    body: [
      "We implement reasonable physical, technical, and administrative security measures to protect your Personal Information from unauthorized access, use, alteration, and disclosure including encryption (SSL/TLS encryption for data in transit, encryption for sensitive data at rest), access controls (role-based access restrictions and authentication requirements), network security (firewalls, intrusion detection, monitoring systems), secure storage (data stored with reputable cloud service providers with strong security practices), employee training (regular security training for employees handling Personal Information), and third-party audits (regular security assessments and audits). You are responsible for keeping your password and account credentials confidential, logging out after each session, securing your devices and internet connection, and notifying us immediately of unauthorized access at hi@movyohealth.com. Despite our security measures, no system is completely secure. We cannot guarantee that unauthorized third parties will never breach our security, your information will remain secure during transmission over the internet, or your devices are protected from unauthorized access. When you use our mobile app, your PHI may be stored unencrypted on your device. While we implement safeguards, we cannot guarantee complete security on your device. We do not use encryption for standard email communications. Avoid sending sensitive information via unencrypted email. In the event of a security breach involving your Personal Information or PHI, we will notify you and relevant authorities as required by applicable law, including HIPAA breach notification requirements.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "10. Children\u2019s Privacy",
    body: [
      "The Platform is not intended for children under 18 years of age. We do not knowingly collect Personal Information from children under 18. If you are under 18, do not use the Platform or provide any information to us. If we learn we have collected Personal Information from a child under 18 without parental consent, we will delete that information promptly. If you believe we have collected information from a child under 18, contact us at hi@movyohealth.com.",
    ],
  },
  {
    id: "third-party",
    title: "11. Third-Party Websites and Services",
    body: [
      "The Platform may contain links to third-party websites, applications, or services that we do not own or control. This Privacy Policy does not apply to third-party sites. We are not responsible for privacy practices or content of third parties. We may have social media pages on platforms like Facebook, Instagram, Twitter, and LinkedIn. When you interact with our social media pages, the social media platform\u2019s privacy policy applies to information you provide or they collect. If you link your Platform account to social media accounts, we may receive information from those platforms in accordance with your privacy settings. Third parties may provide certain services through or in connection with the Platform (such as payment processing, analytics, advertising). These third parties have their own privacy policies governing their collection and use of information. We encourage you to review the privacy policies of any third-party sites or services before providing information to them.",
    ],
  },
  {
    id: "international-transfers",
    title: "12. International Data Transfers",
    body: [
      "The Platform is hosted in the United States and is subject to U.S. federal and state laws. If you access the Platform from outside the United States, your information will be transferred to, stored, and processed in the United States. By using the Platform, you consent to the transfer of your information to the United States and acknowledge that U.S. privacy laws may differ from those in your country, your information will be subject to U.S. law, and U.S. government authorities may access your information under certain circumstances. If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, please note that we do not intentionally collect or process data from individuals in these regions. If you access the Platform from these locations, you do so at your own initiative and are responsible for compliance with local laws.",
    ],
  },
  {
    id: "policy-changes",
    title: "13. Changes to This Privacy Policy",
    body: [
      "We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon posting the updated Privacy Policy on the Platform. When we make material changes, we will update the \"Last Updated\" date at the top, may notify you via email or prominent notice on the Platform, and your continued use after changes constitutes acceptance. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.",
    ],
  },
  {
    id: "contact",
    title: "14. Contact Us",
    body: [
      "For questions about this Privacy Policy or the Platform, contact us at: \u00a9 2026 MoVyo Health. 30 N Gould St Ste R, Sheridan, WY 82801. Email: support@movyohealth.com. Website: www.movyo.net. If you believe we have violated your privacy rights or applicable privacy laws, you may file a complaint by contacting us at the information above. We will investigate all complaints promptly. You also have the right to file a complaint with your local data protection authority or the Federal Trade Commission. We will not retaliate against you for filing a privacy complaint or exercising your privacy rights.",
    ],
    reducedMargin: true,
  },
  {
    id: "additional-disclosures",
    title: "Additional Disclosures",
    body: [
      "SMS/Text Messaging Terms: By providing your mobile phone number and opting in, you consent to receive text messages from MoVyo Health including transactional messages about accounts and orders, appointment reminders and care instructions, AI care coaching messages, and marketing and promotional messages (if opted in). Message frequency varies. Standard message and data rates from your wireless carrier may apply. Reply STOP to any text message to unsubscribe. Reply HELP for assistance. For help with text messages, contact hi@movyohealth.com. Carriers are not liable for delayed or undelivered messages.",
      "CAN-SPAM Compliance: We comply with the CAN-SPAM Act for all email marketing. All marketing emails include accurate sender identification, clear subject lines, our physical address, and unsubscribe instructions.",
      "Protected Health Information (PHI): This Privacy Policy primarily governs non-PHI Personal Information. For information about how we handle PHI under HIPAA, please review our Notice of Privacy Practices, which is a separate document. MoVyo Health may act as a Business Associate of BELUGA HEALTH under HIPAA. In this role, we maintain administrative, physical, and technical safeguards to protect PHI. Information that has been de-identified in accordance with HIPAA standards is not subject to HIPAA restrictions and may be used and disclosed as permitted under this Privacy Policy.",
      "By using the MoVyo Health Platform, you acknowledge that you have read, understood, and agree to this Privacy Policy.",
    ],
      isPlain: true,
  },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 16, 2026";

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[1200px]">
          <header className="sm:pt-8 pb-[10px] text-center sm:px-10 sm:py-6">
            <h1 
              className="mt-2 font-sf text-[40px] sm:text-[40px] font-bold tracking-[-0.5%] text-[#111827]"
              style={{ lineHeight: '114.99999999999999%' }}
            >
              Privacy Policy
            </h1>
          </header>

          <main className="pt-4 text-left text-sm pt-0 leading-relaxed sm:pb-10">
            <div className="space-y-6">
              <p 
                className="mt-[10px] font-sf text-[16px] sm:text-[18px] font-normal mb-[10px]"
                style={{ lineHeight: '100%', letterSpacing: '0%'}}
              >
                Last updated: <span className="font-normal font-black">{lastUpdated}</span>
              </p>
              <p className="text-[16px] sm:text-[18px] font-sf font-normal mb-[10px]" style={{ letterSpacing: '0%'}}>
                DeliveryDart LLC ("DeliveryDart," "we," "us," or "our"), a Wyoming limited liability company, 
                respects your privacy. This Privacy Policy describes how we collect, use, maintain, protect, 
                and disclose information about you through our website at www.movyohealth.com, mobile 
                applications, and related services (the "Platform"). Our separate Notice of Privacy Practices 
                governs Protected Health Information (PHI) under HIPAA. By using the Platform, you agree to 
                this Privacy Policy and our Terms & Conditions. If you disagree, do not use the Platform or 
                provide information. This Privacy Policy may change at any time. Your continued use after 
                changes constitutes acceptance, so review this policy periodically.
              </p>
              
              <p className="text-[16px] sm:text-[18px] font-sf font-normal mb-[10px]" style={{ letterSpacing: '-3%'}}>
                Contact Information: 30 N Gould St Ste R, Sheridan, WY 82801, Email: support@movyohealth.com, Website: www.movyohealth.com
              </p>

              <div className="space-y-8">
                {sections.map((section) => (
                  <section 
                    key={section.id} 
                    id={section.id} 
                    className="scroll-mt-28 mb-[10px]"
                    style={{ marginBottom: section.reducedMargin ? '10px' : '0px' }}
                  >
                    <h2 
                      className={`font-sf text-[18px] sm:text-[20px] ${section.isPlain ? 'font-normal' : 'font-bold'} uppercase ${section.isPlain ? 'text-[#111827]' : ''}`}
                      style={{ 
                        lineHeight: '100%', 
                        letterSpacing: '0%', 
                        color: section.isPlain ? '#111827' : '#0659c4',
                        marginTop: section.isPlain ? '10px' : '0px'
                      }}
                    >
                      {section.title}
                    </h2>
                    <div className="text-[16px] sm:text-[18px] font-sf font-normal mt-[10px]" style={{ letterSpacing: '0%'}}>
                      {section.body.map((paragraph, idx) => (
                        <p key={idx} className="mb-[10px]">{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}