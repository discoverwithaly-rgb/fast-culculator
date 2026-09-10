import React from 'react';
import { AdSensePlaceholder } from '../AdSensePlaceholder';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6 text-slate-700 text-sm leading-relaxed">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Legal Compliance</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: September 2026
          </p>
        </div>

        <AdSensePlaceholder slotId="privacy-top" format="horizontal" />

        <p>
          At <strong>Asan Calculator</strong> (accessible from our website), the privacy of our visitors is of paramount importance to us. This Privacy Policy document contains types of information that is collected and recorded by Asan Calculator and how we use it.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Client-Side Calculation Guarantee</h2>
        <p>
          All calculations performed on Asan Calculator (including financial numbers, salary figures, age/dates, weight, and academic grades) are calculated locally in your web browser using client-side JavaScript. <strong>We do not transmit, record, or store your calculation entries on our servers.</strong>
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Log Files</h2>
        <p>
          Asan Calculator follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. Cookies and Web Beacons</h2>
        <p>
          Like any other website, Asan Calculator uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">4. Google DoubleClick DART Cookie &amp; AdSense</h2>
        <p>
          Google is one of our third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">https://policies.google.com/technologies/ads</a>.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">5. Third-Party Privacy Policies</h2>
        <p>
          Asan Calculator's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">6. Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Asan Calculator does not knowingly collect any Personal Identifiable Information from children under the age of 13.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">7. Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>
      </div>
    </div>
  );
};
