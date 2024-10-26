// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from 'react';

const RenderEmails = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [email, setEmail] = useState('c@dmcanow.io');
  const [subject, setSubject] = useState('Тестовое письмо');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const htmlFiles = [
    { link: 'Company_Created.html', title: 'Company Created' },
    { link: 'Complete_Order_3.html', title: 'Complete Order' },
    {
      link: 'Customer_is_Not_Specified_in_the_Notice_2.html',
      title: 'Customer is Not Specified in the Notice',
    },
    {
      link: 'Former_Customer_Notification_2.html',
      title: 'Former Customer Notification',
    },
    { link: 'Invited_to_company_2.html', title: 'Invited to company' },
    {
      link: 'New_DMCA_Amendment_Order_3.html',
      title: 'New DMCA Amendment Order',
    },
    {
      link: 'New_DMCA_Amendment_Order_-_Complete_+_Domains_Added_3.html',
      title: 'New DMCA Amendment Order - Complete',
    },
    {
      link: 'New_DMCA_Amendment_Order_Complete_Representative_3.html',
      title: 'New DMCA Amendment Order Complete Representative',
    },
    { link: 'New_Order_3.html', title: 'New Order' },
    { link: 'Notice_Email.html', title: 'Notice Email' },
    {
      link: 'Request_to_Send_Only_DMCA_Notices_2.html',
      title: 'Request to Send Only DMCA Notices',
    },
    { link: 'Reset_Pass.html', title: 'Reset Pass' },
    { link: 'Reset_Pass_Confirmation.html', title: 'Reset Pass Confirmation' },
  ];

  // Функция для загрузки конкретного HTML файла
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
      setSuccess('Message sent successfully');
      setTimeout(() => {
        setSuccess('');
      }, 7000)
    }).catch(() => {
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
        {htmlFiles.map((file, index) => (
          <button
            className="bg-mainBlue text-white py-1.5 px-2 m-1.5 rounded"
            key={index}
            onClick={() => loadHtmlFile(file.link)}
          >
            {file.title}
          </button>
        ))}

        {htmlContent && (
          <div className="mt-8 flex items-center justify-start gap-y-7">
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
              className="bg-mainBlue mr-2 text-white px-4 py-2 rounded font-bold w-fit hover:cursor-pointer"
              onClick={send}
            >
              Send Email
            </div>
            {error && <div className="text-red-600 font-bold">{error}</div>}
            {success && <div className="text-green-600 font-bold">{success}</div>}
          </div>
        )}
      </div>
      {htmlContent && (
        <div className="bg-gray-300 p-4">
          <div
            className="bg-white py-6"
            dangerouslySetInnerHTML={{__html: htmlContent}}
          />
        </div>
      )}
    </div>
  );
};

export default RenderEmails;
