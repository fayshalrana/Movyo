import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Movyo Health",
  description: "Review the terms and conditions for using Movyo Health services and website.",
};

const sections: { id: string; title: string; body: string[] }[] = [
  {
    id: "acceptance",
    title: "1. Acceptance and Modifications",
    body: [
      "By accessing the Platform, you affirm that you are at least 18 years old, reside in the United States where our services are available, and agree to conduct business electronically. You consent to receive all communications electronically via email, text, or Platform notifications. We may modify these Terms at any time by posting updates on the Platform. Your continued use after changes constitutes acceptance. We will update the \"Last updated\" date above when changes occur. If you don't agree to changes, stop using the Platform immediately.",
    ],
  },
  {
    id: "who-we-are",
    title: "2. Who We Are and What We Do",
    body: [
      "MOVYO Health is a brand operated by DeliveryDart LLC, a Wyoming limited liability company. MOVYO Health is a technology platform that facilitates access to telehealth services, GLP-1 compounded medication subscriptions, and AI-powered wellness support. We are NOT a healthcare provider, medical practice, or pharmacy. We do not practice medicine, diagnose conditions, prescribe medications, or dispense drugs. All medical services are provided by BELUGA HEALTH, a licensed telehealth medical group that contracts with independent physicians and healthcare practitioners. These providers are solely responsible for all medical decisions, prescriptions, and treatment. We connect you with these providers but do not control or interfere with their medical judgment. Prescriptions are filled by independent, licensed US pharmacies. We are not responsible for the quality of medical care or medications you receive from third parties.",
    ],
  },
  {
    id: "ai-coaching",
    title: "3. AI-Powered Care Coaching",
    body: [
      "The Platform includes AI-powered care coaching designed to provide educational support, guidance, and adherence reinforcement. AI care coaches do NOT diagnose, prescribe, or provide medical treatment. They are support tools that help you understand your treatment journey and connect you with licensed medical providers when needed. The AI system escalates concerns to human medical staff when appropriate. You acknowledge that AI coaching is supplemental to, not a replacement for, professional medical care.",
    ],
  },
  {
    id: "eligibility",
    title: "4. Eligibility and Account Requirements",
    body: [
      "To use the Platform, you must be at least 18 years old, live in a US state where we offer services, have internet access and compatible devices, and agree to these Terms. Meeting these requirements does not guarantee you will receive medical services. Providers may determine on a case-by-case basis that services are not appropriate for you. You must register to access services by providing truthful, accurate, and complete information. You are responsible for maintaining your account credentials confidentially, immediately notifying us of unauthorized access at hi@movyohealth.com, and all activities under your account. We may suspend or terminate your account if you violate these Terms or provide inaccurate information.",
    ],
  },
  {
    id: "medical-intake",
    title: "5. Medical Intake and Information",
    body: [
      "You must complete a medical intake form that collects your health history, current conditions, medications, allergies, vital signs, and personal information. You consent to us sharing all this information with BELUGA HEALTH providers, pharmacies, laboratories, and our service providers to facilitate your care. You represent that all information you provide is truthful and complete. Inaccurate or incomplete information may result in inappropriate treatment decisions or account termination. We cannot verify all information you provide, so we are not responsible for consequences arising from inaccurate or incomplete information. Providers depend on the completeness and accuracy of your information to make safe medical decisions.",
    ],
  },
  {
    id: "telehealth",
    title: "6. Telehealth Consent",
    body: [
      "Telehealth involves healthcare delivery using electronic communications between you and providers in different locations. While telehealth offers convenience, it has risks including technical difficulties, limitations in physical examination, potential misunderstandings, and security risks despite safeguards. To receive services, you must review and agree to a detailed Telehealth Informed Consent provided by BELUGA HEALTH. You agree that MOVYO Health is a third-party beneficiary with enforcement rights. Certain conditions require in-person evaluation or emergency care. If your provider determines telehealth is inappropriate for your situation, you will be advised to seek in-person care.",
    ],
  },
  {
    id: "prescriptions",
    title: "7. Prescription Medications and Pharmacy Waiver",
    body: [
      "Certain products require valid prescriptions from licensed providers. You will not receive prescription medications unless you complete a consultation, a provider determines the medication is appropriate, and a prescription is written. IMPORTANT WAIVER: If a provider writes you a prescription through the Platform, it will be filled through one of our contracted licensed pharmacies. By using the Platform, you voluntarily and unconditionally waive your right to fill prescriptions at any pharmacy of your choice. If you don't want to waive this right, do not use the Platform. Prescriptions fulfilled through our pharmacies do not use child-resistant packaging. You are responsible for keeping medications away from children. Completing a consultation does not guarantee you will receive a prescription. Providers exercise independent judgment in prescribing decisions.",
    ],
  },
  {
    id: "subscriptions",
    title: "8. Subscription Services and Payments",
    body: [
      "Certain services are offered on a subscription basis with automatic recurring billing. When you purchase a subscription, your payment method will be charged at regular intervals (typically monthly) until you cancel. You authorize automatic charges and will receive email notification 5-7 days before each charge. The subscription price includes Platform access fees (charged by MOVYO Health), medical consultation fees (charged by BELUGA HEALTH), and medication costs (charged by the pharmacy if prescribed). We collect the full amount and remit applicable portions to providers and pharmacies. You may cancel your subscription at any time up to 48 hours before your next billing date by turning off auto-refill in your portal or contacting hi@movyohealth.com. Cancellations made less than 48 hours before billing may still result in a charge. Medical consultation fees are non-refundable once a consultation is completed. By providing payment information, you authorize us and our payment processors to charge amounts due. We use Stripe and other secure processors to handle payment data. We do not store complete credit card information. You are solely responsible for all fees. BELUGA HEALTH providers are \"out-of-network\" with all health insurance plans including Medicare and Medicaid, so services are not covered by insurance. Final charges may vary based on prescribed medication and pharmacy. If your payment fails, we may suspend services or cancel your subscription.",
    ],
  },
  {
    id: "refunds",
    title: "9. Refund Policy Summary",
    body: [
      "Medical consultation fees are non-refundable once completed. Prescription medications cannot be returned or refunded once approved and transmitted to the pharmacy due to federal regulations. We offer a 30-day money-back guarantee only if you are disqualified from treatment by a provider. You may attempt to cancel orders within 24 hours if not yet reviewed by a provider. See our complete Refund Policy for details. We cannot accept returns of prescription medications for reuse or resale. All sales of prescription products are final.",
    ],
  },
  {
    id: "conduct",
    title: "10. User Conduct and Prohibited Uses",
    body: [
      "You agree not to use the Platform for unlawful purposes, provide false information, impersonate others, post harmful or abusive content, upload viruses or malicious code, attempt unauthorized access to systems, use the Platform for anyone other than yourself, interfere with Platform operation, harvest user information, use automated systems to access the Platform, remove copyright notices, or violate any applicable laws. You may not use the Platform on jailbroken or modified mobile devices as this compromises security protections for your health information. Any violation may result in immediate account termination and legal action.",
    ],
  },
  {
    id: "sms",
    title: "11. SMS and Text Messaging",
    body: [
      "By providing your mobile number and opting in, you consent to receive transactional messages about orders and appointments, informational messages about treatment and care, AI care coaching messages, and marketing messages (if opted in). Message frequency varies. Standard message and data rates apply. Reply STOP to opt out or HELP for assistance. You cannot opt out of transactional messages while remaining an active user. Carriers are not liable for delayed or undelivered messages.",
    ],
  },
  {
    id: "intellectual-property",
    title: "12. Intellectual Property",
    body: [
      "All Platform content including text, graphics, logos, images, software, and data is owned by MOVYO Health or its licensors and protected by copyright, trademark, and other intellectual property laws. We grant you a limited, personal, non-exclusive, non-transferable, revocable license to access and use the Platform for personal, non-commercial use only. You may not copy, modify, distribute, sell, or create derivative works from Platform content. Certain trademarks and logos are owned by MOVYO Health or affiliates. You may not use our trademarks without written permission. If you submit content to the Platform (reviews, comments, messages), you grant us a non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, and display that content for operating and improving the Platform.",
    ],
  },
  {
    id: "third-party",
    title: "13. Third-Party Links and Services",
    body: [
      "The Platform may contain links to third-party websites or services not controlled by MOVYO Health. We are not responsible for third-party content, privacy practices, products, or services. Your use of third-party sites is at your own risk and subject to their terms and policies. We do not endorse or make representations about third-party sites. Review their policies before providing information or making transactions.",
    ],
  },
  {
    id: "disclaimers",
    title: "14. Disclaimers and Warranties",
    body: [
      "THE PLATFORM AND SERVICES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We disclaim all warranties including merchantability, fitness for a particular purpose, title, non-infringement, accuracy, completeness, and security. We do not guarantee that you will receive a prescription or specific treatment, any medical outcomes or weight loss results, that services will meet your expectations, uninterrupted or error-free operation, that all information is accurate or current, or that the Platform is free from viruses or harmful code. The Platform is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek advice from your physician with questions about medical conditions. We do not guarantee results. Testimonials represent individual experiences and do not guarantee similar outcomes for you. Results vary based on adherence, lifestyle, and personal health conditions. Some jurisdictions do not allow disclaimer of implied warranties, so these limitations may not fully apply to you.",
    ],
  },
  {
    id: "liability",
    title: "15. Limitation of Liability",
    body: [
      "TO THE FULLEST EXTENT PERMITTED BY LAW, MOVYO HEALTH IS NOT LIABLE FOR ANY MEDICAL DECISIONS, TREATMENT, OR OUTCOMES PROVIDED BY THIRD-PARTY HEALTHCARE PROVIDERS OR PHARMACIES. In no event shall MOVYO Health, its officers, directors, employees, agents, or affiliates be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages including lost profits, loss of data or goodwill, personal injury or wrongful death, medical complications or adverse reactions, emotional distress, or any damages arising from use or inability to use the Platform. Our total liability for any claims shall not exceed the amount you paid us in the six months preceding the claim, or $100, whichever is greater. Some jurisdictions do not allow limitation of liability for certain damages, so these limitations may not fully apply to you. You acknowledge that this limitation of liability is a fundamental element of the agreement between you and MOVYO Health.",
    ],
  },
  {
    id: "indemnification",
    title: "16. Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless MOVYO Health and its officers, directors, employees, agents, affiliates, and licensors from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from your violation of these Terms, your use of the Platform, your violation of any law or regulation, your violation of third-party rights, any content you submit, or your use of medical services obtained through the Platform. We may assume exclusive defense and control of any matter subject to indemnification, and you agree to cooperate with our defense.",
    ],
  },
  {
    id: "privacy",
    title: "17. Privacy and Data Protection",
    body: [
      "Our collection, use, and disclosure of your personal information is governed by our Privacy Policy, which is incorporated into these Terms. We maintain HIPAA-compliant practices to protect your health information. You are responsible for ensuring account security, not sharing login credentials, using secure internet connections, and maintaining updated contact information. Please review our Privacy Policy and Notice of Privacy Practices for detailed information about data handling.",
    ],
  },
  {
    id: "disputes",
    title: "18. Dispute Resolution and Arbitration",
    body: [
      "YOU AND MOVYO HEALTH AGREE THAT ANY DISPUTE ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE PLATFORM WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION, EXCEPT AS PROVIDED BELOW. This arbitration agreement applies to disputes with MOVYO Health, BELUGA HEALTH, contracted medical providers, and pharmacy partners. CLASS ACTION WAIVER: You and we agree that claims must be brought individually only, not as a plaintiff or class member in any class, collective, or representative action. Class arbitrations, class actions, and representative actions are not permitted. You and we waive the right to participate in class actions or class arbitrations. Arbitration Procedures: Arbitration will be conducted by the American Arbitration Association (AAA) under its Consumer Arbitration Rules in San Francisco, California. Costs will be allocated according to AAA rules. Exceptions: You may bring claims in small claims court if they qualify. Either party may seek injunctive relief in court to prevent unauthorized use of intellectual property. Notice and Informal Resolution: Before initiating arbitration, you must send written Notice of Dispute to DeliveryDart LLC, 30 N Gould St Ste R, Sheridan, WY 82801, or hi@movyohealth.com. We will attempt to resolve disputes informally within 30 days. If unresolved, either party may proceed to arbitration. Opt-Out Right: You may opt out of this arbitration agreement within 30 days of first accepting these Terms by sending written notice to the address above including your name, contact information, account username or email, and a clear statement that you wish to opt out. Jury Trial Waiver: You and we waive the right to trial by jury.",
    ],
  },
  {
    id: "jurisdiction",
    title: "19. Governing Law and Jurisdiction",
    body: [
      "These Terms are governed by the laws of the State of Delaware and applicable federal law, without regard to conflict of law principles. For disputes not subject to arbitration, you agree to submit to the exclusive jurisdiction of state or federal courts located in Delaware.",
    ],
  },
  {
    id: "termination",
    title: "20. Account Termination",
    body: [
      "These Terms remain in effect as long as you use the Platform. You may terminate by discontinuing use. Your permission to use the Platform automatically terminates if you violate these Terms. We may terminate or suspend your access with or without notice for any reason including violation of these Terms, inaccurate information, fraudulent activity, or as necessary to maintain Platform security. The following provisions survive termination: disclaimers, limitation of liability, indemnification, dispute resolution, arbitration, and intellectual property provisions. After termination, we have no further obligation to provide services except as required by law for health records or continuing care obligations.",
    ],
  },
  {
    id: "general",
    title: "21. General Provisions",
    body: [
      "These Terms, together with our Privacy Policy and any other policies referenced, constitute the entire agreement between you and MOVYO Health. If any provision is found unenforceable, it will be severed and the remaining provisions will remain in effect. Our failure to enforce any right or provision does not constitute a waiver. You may not assign or transfer these Terms without our written consent. We may assign these Terms to any affiliate or successor without restriction. We are not liable for failure or delay due to circumstances beyond our reasonable control including acts of God, war, terrorism, pandemics, natural disasters, or government actions. You consent to receive all communications electronically. Electronic communications satisfy legal requirements for writing. We comply with the CAN-SPAM Act. You may unsubscribe from marketing emails but cannot opt out of transactional emails related to services. Headings are for reference only and do not limit the scope of provisions.",
    ],
  },
  {
    id: "contact",
    title: "22. Contact Information",
    body: [
      "For questions about these Terms or the Platform, contact us at: © 2026 MOVYO Health. 30 N Gould St Ste R, Sheridan, WY 82801, Email: support@movyohealth.com, Website: www.movyo.net.",
      "By using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.",
      "MOVYO Health is a patient management platform that works with independent physicians and practitioners who provide services through the Platform. MOVYO Health does not directly provide medical or pharmacy services. Payment does not guarantee prescription issuance. Medical services are provided by independent providers. Information on this Platform is for informational purposes only and not a substitute for professional medical advice, diagnosis, or treatment. If you have questions about your health, talk to your doctor.",
    ],
  },
];

export default function TermsAndConditionsPage() {
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
              Terms & Conditions
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
              <p className="text-[16px] sm:text-[18px] font-sf font-normal mb-[10px]" style={{ letterSpacing: '-2%'}}>
                These Terms & Conditions ("Terms") govern your use of www.movyo.net and
                related services (the "Platform") operated by DeliveryDart LLC, a Delaware
                corporation located at 30 N Gould St Ste R, Sheridan, WY 82801. By using the Platform,
                you agree to these Terms, our Privacy Policy, and Consent to Telehealth. If you
                disagree with any part of these Terms, do not use the Platform.
              </p>
              
              <p className="text-[16px] sm:text-[18px] font-sf font-normal mb-[10px]" style={{ letterSpacing: '-3%'}}>
                IF YOU HAVE A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY. THIS SERVICE IS NOT FOR EMERGENCIES.
              </p>
              
              <p className="text-[16px] sm:text-[18px] font-sf font-normal mb-[10px]" style={{ letterSpacing: '-1%'}}>
                ARBITRATION NOTICE: Disputes will be resolved by binding individual arbitration. You waive your right to a jury trial and class action participation as detailed in Section 18.
              </p>

              <div className="space-y-8">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28 mb-[10px]">
                    <h2 
                      className="font-sf text-[18px] sm:text-[20px] font-bold uppercase text-[#111827]"
                      style={{ lineHeight: '100%', letterSpacing: '0%', color: '#0659c4' }}
                    >
                      {section.title}
                    </h2>
                    <div className="text-[16px] sm:text-[18px] font-sf font-normal mt-[10px]" style={{ letterSpacing: '-2%'}}>
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