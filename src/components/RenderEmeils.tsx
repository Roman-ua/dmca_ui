// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa";

const htmlFiles = [
  {
    link: 'DMCA_Agent_Order_Complete.html',
    title: 'DMCA Agent Order - Complete',
    sectionId: 1,
    subj: 'DMCA Agent Order 12435 for ABC Company'
  },
  {
    link: 'DMCA_Agent_Order.html',
    title: 'DMCA Agent Order',
    sectionId: 1,
    subj:'DMCA Agent Order 12435 for ABC Company'
  },
  {
    link: 'DMCA_Agent_Order_Edited.html',
    title: 'DMCA Agent Order Edited',
    sectionId: 1,
    subj:'DMCA Agent Order 12435 edited for ABC Company'
  },
  {
    link: 'DMCA_Amendment_Order.html',
    title: 'DMCA Amendment Order',
    sectionId: 5,
    subj: 'DMCA Agent Amendment Order 32456 for ABC Company'
  },
  {
    link: 'DMCA_Amendment_Order_Complete.html',
    title: 'DMCA Amendment Order - Complete',
    sectionId: 5,
    subj: 'DMCA Agent Amendment Order 56423 for ABC Company'
  },
  {
    link: 'Notice.html',
    title: 'Notice',
    sectionId: 2,
    subj: '867 - DMCA Takedown Notice'
  },
  {
    link: 'Request_to_Send_Only_DMCA_Notices_2.html',
    title: 'Request to Send Only DMCA Notices',
    sectionId: 2,
    subj: 'incoming_email_subject'
  },
  {
    link: 'Former_Customer_Notification_2.html',
    title: 'Former Customer Notification',
    sectionId: 2,
    subj: 'incoming_email_subject'
  },
  {
    link: 'No_service.html',
    title: 'No Service',
    sectionId: 2,
    subj: 'From email that we received'
  },
  {
    link: 'Customer_is_Not_Specified_in_the_Notice_2.html',
    title: 'Customer is Not Specified in the Notice',
    sectionId: 2,
    subj: 'incoming_email_subject'
  },
  {
    link: 'Invite.html',
    title: 'Invite',
    sectionId: 3,
    subj: 'Welcome to dmcanow.io! Invitation to join ABC Company'
  },
  {
    link: 'Password_Reset.html',
    title: 'Password Reset',
    sectionId: 4,
    subj: 'Reset your dmcanow.io password'
  },
  {
    link: 'Password_Reset_Confirmation.html',
    title: 'Password Reset - Confirmation',
    sectionId: 4,
    subj: 'Your password was updated'
  },
];


const sections = [
  {
    title: 'DMCA Agent Oder', id: 1
  },
  {
    title: 'DMCA Amendment Order', id: 5
  },
  {
    title: 'Notices', id: 2
  },
  {
    title: 'Users', id: 3
  },
  {
    title: 'Security (Password)', id: 4
  }
]

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const RenderEmails = () => {
  const location = useLocation();

  const [htmlContent, setHtmlContent] = useState('');
  const [email, setEmail] = useState('c@dmcanow.io');
  const [subject, setSubject] = useState('Тестовое письмо');
  const [activeBtn, setActiveBtn] = useState('');
  const [activeSection, setActiveSection] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const queryKeyHandler = (location: Location, key: string, value?: string) => {
    const searchParams = new URLSearchParams(location.search);
    const myParam = searchParams.get(key);

    if (value) {
      searchParams.set(key, value);
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }

    return myParam || '';
  };

  const templateFormQuery = queryKeyHandler(location, 'template');

  useEffect(() => {
    if (templateFormQuery) {
      const file = htmlFiles.find((file) => file.title.replaceAll(' ', '_') === templateFormQuery);
      if (file) {
        setActiveBtn(file.title);
        loadHtmlFile(file.link);
        setActiveSection(file.sectionId);
        setSubject(file.subj);
      }
    }
  }, [templateFormQuery]);

  const loadHtmlFile = (fileName: string) => {
    fetch(`/html/${fileName}`)
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке HTML файла:', error);
      });
  };
  const send = () => {
    setLoading(true);
    fetch('https://sender-w6ve.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: subject,
        text: 'Это текст письма',
        html: htmlContent,
      }),
    }).then(() => {
      setLoading(false);
      setSuccess('Message sent successfully');
      setTimeout(() => {
        setSuccess('');
      }, 7000)
    }).catch(() => {
      setLoading(false);
      setError('Error sending email');
      setTimeout(() => {
        setError('');
      }, 7000)
      console.error('Ошибка при отправке письма:', error);
    });
  };

  return (
    <div>
      <div className="pb-10 bg-white">
        {sections.map((section, index) => {
          const currentButtons = htmlFiles.filter((file) => file.sectionId === section.id);
          return (
            <div key={index} className="mb-12">
              <div className="w-full mb-6  flex items-center justify-between border-b border-gray-200 pb-6">
                <h2 className="text-base font-semibold leading-7 text-gray-700">{section.title}</h2>
                {htmlContent && activeSection === section.id && (
                  <div className="flex items-center justify-start gap-y-7">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="To"
                      className="mr-2 outline-0 block rounded border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue sm:text-sm sm:leading-6"
                    />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                      className="mr-2 outline-0 block rounded border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue sm:text-sm sm:leading-6"
                    />
                    <div
                      className="bg-mainBlue mr-2 text-white flex items-center px-4 h-10 rounded font-bold w-fit hover:cursor-pointer"
                      onClick={send}
                    >
                      {loading ? (
                        <svg aria-hidden="true"
                             className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="gray-400"/>
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="white"/>
                        </svg>
                      ) : 'Send Email'}
                    </div>
                    {error && <div className="text-red-600 font-bold">{error}</div>}
                    {success && <div className="text-green-600 font-bold">{success}</div>}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-start">
                {currentButtons.map((btn, index) => {
                  return (
                    <button
                      className={classNames(
                        'flex items-center justify-between',
                        'rounded-full px-3.5 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset mr-3',
                        btn.title === activeBtn ? 'bg-mainBlue text-white ring-mainBlue' : 'bg-white text-gray-900 ring-gray-300'
                      )}
                      key={index}
                      onClick={() => {
                        setActiveBtn(btn.title);
                        loadHtmlFile(btn.link);
                        setActiveSection(btn.sectionId);
                        setSubject(btn.subj);
                        queryKeyHandler(location, 'template', `${btn.title.replaceAll(' ', '_')}`);
                      }}
                    >
                      <span className="mr-2">📧</span>
                      {btn.title}
                      <FaArrowRight className={classNames(
                        'inline ml-2 w-3 h-3',
                        btn.title === activeBtn ? 'text-white' : 'text-gray-700'
                      )} />
                    </button>
                  )
                })}
              </div>
              {htmlContent && activeSection === section.id && (
                <div className="bg-white flex items-center justify-center flex-col p-4 mt-4">
                  <div className="mb-4 flex items-center">
                    <span className="text-gray-500 font-bold">Subject:</span>
                    <span className="border py-1.5 px-2 rounded text-gray-700 font-bold ml-2">{subject}</span>
                  </div>
                  <div
                    className="bg-white w-[600px] border border-gray-200 rounded py-6"
                    dangerouslySetInnerHTML={{__html: htmlContent}}
                  ></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RenderEmails;
