// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa";

const htmlFiles = [
  {
    link: 'DMCA_Agent_Order.html',
    title: 'DMCA Agent Order',
    sectionId: 1,
    subj: `DMCA Agent Order ({order_id}) for {company_name}`,
    subjOne: 'DMCA Agent Order (',
    varOne: '{order_id}',
    subjTwo: ') for ',
    varTwo: '{company_name}',
    vars: true
  },
  {
    link: 'DMCA_Agent_Order_Edited.html',
    title: 'DMCA Agent Order - Edited',
    sectionId: 1,
    subj: `DMCA Agent Order ({order_id}) for {company_name}`,
    subjOne: 'DMCA Agent Order (',
    varOne: '{order_id}',
    subjTwo: ') for ',
    varTwo: '{company_name}',
    vars: true
  },
  {
    link: 'DMCA_Agent_Order_Complete.html',
    title: 'DMCA Agent Order - Complete',
    sectionId: 1,
    subj: `DMCA Agent Order ({order_id}) for {company_name}`,
    subjOne: 'DMCA Agent Order (',
    varOne: '{order_id}',
    subjTwo: ') for ',
    varTwo: '{company_name}',
    vars: true
  },
  {
    link: 'DMCA_Amendment_Order.html',
    title: 'DMCA Amendment Order',
    sectionId: 5,
    subj: 'DMCA Agent Amendment Order ({order_id}) for {company_name}',
    subjOne: 'DMCA Agent Amendment Order (',
    varOne: '{order_id}',
    subjTwo: ') for ',
    varTwo: '{company_name}',
    vars: true
  },
  {
    link: 'DMCA_Amendment_Order_Complete.html',
    title: 'DMCA Amendment Order - Complete',
    sectionId: 5,
    subj: 'DMCA Agent Amendment Order ({order_id}) for {company_name}',
    subjOne: 'DMCA Agent Amendment Order (',
    varOne: '{order_id}',
    subjTwo: ') for ',
    varTwo: '{company_name}',
    vars: true
  },
  {
    link: 'Notice.html',
    title: 'Notice - Email',
    sectionId: 2,
    subj: 'incoming_email_subject',
    subjOne: '',
    varOne: '{incoming_email_subject}',
    subjTwo: '',
    varTwo: '',
    vars: true
  },
  {
    link: 'Request_to_Send_Only_DMCA_Notices_2.html',
    title: 'Request to Send Only DMCA Notices',
    sectionId: 2,
    subj: 'incoming_email_subject',
    subjOne: '',
    varOne: '{incoming_email_subject}',
    subjTwo: '',
    varTwo: '',
    vars: true
  },
  {
    link: 'Former_Customer_Notification_2.html',
    title: 'Former Customer Notification',
    sectionId: 2,
    subj: 'incoming_email_subject',
    subjOne: '',
    varOne: '{incoming_email_subject}',
    subjTwo: '',
    varTwo: '',
    vars: true
  },
  {
    link: 'No_service.html',
    title: 'No Service',
    sectionId: 2,
    subj: 'incoming_email_subject',
    subjOne: '',
    varOne: '{incoming_email_subject}',
    subjTwo: '',
    varTwo: '',
    vars: true
  },
  {
    link: 'Customer_is_Not_Specified_in_the_Notice_2.html',
    title: 'Customer is Not Specified in the Notice',
    sectionId: 2,
    subj: 'incoming_email_subject',
    subjOne: '',
    varOne: '{incoming_email_subject}',
    subjTwo: '',
    varTwo: '',
    vars: true
  },
  {
    link: 'Invite.html',
    title: 'Invitation - Join Company',
    sectionId: 3,
    subj: 'Welcome to dmcanow.io! Invitation to join {company_name}',
    subjOne: 'Welcome to dmcanow.io! Invitation to join',
    varOne: '',
    subjTwo: '',
    varTwo: '{company_name}',
    vars: true
  },
  {
    link: 'Password_Reset.html',
    title: 'Password Reset',
    sectionId: 4,
    subj: 'Reset your dmcanow.io password',
    vars: false
  },
  {
    link: 'Password_Reset_Confirmation.html',
    title: 'Password Reset - Confirmation',
    sectionId: 4,
    subj: 'Your dmcanow.io password was updated',
    vars: false
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

  const [htmlContent, setHtmlContent] = useState({});
  const [email, setEmail] = useState('c@dmcanow.io');
  const [subject, setSubject] = useState({});
  const [activeBtn, setActiveBtn] = useState({});

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
        setActiveBtn((prev) => ({...prev, [file.sectionId]: file.title}));
        setSubject((prev) => ({...prev, [file.sectionId]: file}));
        loadHtmlFile(file.link, file.sectionId);
      }
    }
  }, [templateFormQuery]);

  const loadHtmlFile = (fileName: string, sectionId: number) => {
    fetch(`/html/${fileName}`)
      .then((response) => response.text())
      .then((data) => {
        const currentFile = htmlFiles.find((file) => file.link === fileName);
        setHtmlContent((prev) => {
          return {...prev, [sectionId]: data}
        });
      })
      .catch((error) => {
        console.error('Ошибка при загрузке HTML файла:', error);
      });
  };
  const send = (sectionId: number) => {
    setLoading(true);
    fetch('https://sender-w6ve.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: subject[sectionId].subj,
        text: 'Это текст письма',
        html: htmlContent[sectionId],
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
  console.log(htmlContent, 'htmlContent')
  return (
    <div>
      <div className="pb-10 bg-white">
        {sections.map((section, index) => {
          const currentButtons = htmlFiles.filter((file) => file.sectionId === section.id);
          return (
            <div key={index} className="mb-12">
              <div className="w-full mb-6  flex items-center justify-between border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold leading-7 text-gray-900">{section.title}</h2>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  {currentButtons.map((btn, index) => {
                    return (
                      <button
                        className={classNames(
                          'flex items-center justify-between mb-3',
                          'rounded-full px-3.5 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset',
                          btn.title === activeBtn[btn.sectionId] ? 'bg-mainBlue text-white ring-mainBlue' : 'bg-white text-gray-900 ring-gray-300'
                        )}
                        key={index}
                        onClick={() => {
                          setActiveBtn((prev) => ({...prev, [btn.sectionId]: btn.title}));
                          loadHtmlFile(btn.link, btn.sectionId);
                          setSubject((prev) => ({...prev, [btn.sectionId]: btn}));
                          queryKeyHandler(location, 'template', `${btn.title.replaceAll(' ', '_')}`);
                        }}
                      >
                        <span className="mr-2">📧</span>
                        {btn.title}
                        <FaArrowRight className={classNames(
                          'inline ml-2 w-3 h-3',
                          btn.title === activeBtn[btn.sectionId] ? 'text-white' : 'text-gray-700'
                        )} />
                      </button>
                    )
                  })}
                </div>
                {htmlContent[section.id] && (
                  <div className="bg-white flex items-center justify-center flex-col">
                    <div className="flex items-center justify-end gap-x-2 mb-3 w-full">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="To"
                        className="w-full outline-0 block rounded border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue sm:text-sm sm:leading-6"
                      />
                      <div
                        className="rounded flex items-center justify-center w-1/5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                        onClick={() => send(section.id)}
                      >
                        {loading ? (
                          <svg aria-hidden="true"
                               className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="lightgray"/>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="blue"/>
                          </svg>
                        ) : 'Send Email'}
                      </div>
                      {error && <div className="text-red-600 font-bold">{error}</div>}
                      {success && <div className="text-green-600 font-bold">{success}</div>}
                    </div>
                    <div className="w-[600px] flex items-center border-t border-r border-l rounded-t px-2 py-2">
                      {!subject[section.id].vars && (
                        <span className="text-gray-700 text-sm font-bold">{subject[section.id].subj}</span>
                      )}
                      {subject[section.id].vars && (
                        <>
                          {subject[section.id].subjOne && (
                            <span className="text-gray-700 text-sm font-bold">
                              {subject[section.id].subjOne}
                            </span>
                          )}
                          {subject[section.id].varOne && (
                            <span className="text-gray-700 text-sm font-bold bg-gray-200">
                              {subject[section.id].varOne}
                            </span>
                          )}
                          {subject[section.id].subjTwo && (
                            <span className="text-gray-700 text-sm font-bold">
                              {subject[section.id].subjTwo}
                            </span>
                          )}
                          {subject[section.id].varTwo && (
                            <span className="ml-1.5 text-gray-700 text-sm font-bold bg-gray-200">
                              {subject[section.id].varTwo}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className="bg-white w-[600px] border border-gray-200 rounded-b py-6"
                      dangerouslySetInnerHTML={{__html: htmlContent[section.id]}}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RenderEmails;
