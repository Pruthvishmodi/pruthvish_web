import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import fetch from '@lib/fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';
import './contact.module.css';

const defaultForm = {
  name: '',
  mobile: '',
  email: '',
  subject: '',
  description: '',
};

const Contact = ({ data }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const query = `
      mutation {
        createContact(input: {
          data: {
            name: "${formData.name}",
            mobile: "${formData.mobile}",
            email: "${formData.email}",
            subject: "${formData.subject}",
            description: "${formData.description}",
          }
        }){
          contact {
            id
          }
        }
      }
      `;
      const res = await fetch(query);
      setToast({
        variant: 'success',
        header: 'Thank you for getting in touch!',
        text: 'I appreciate you contacting me.I will get back in touch with you soon!',
      });
      setFormData(defaultForm);

      console.log('submitForm -> res', res);
    } catch (error) {
      console.log(error);
      setToast({
        variant: 'danger',
        header: 'Oh snap! You got an error!',
        text: 'Something went wrong. Please try after sometime...',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="section p-0px-b contact-section">
        <div className="container">
          <div className="row justify-content-center m-60px-b md-m-40px-b">
            <div className="col-12 col-md-10 col-lg-7">
              <div className="section-title text-center">
                <h2 className="font-alt">{data?.title ?? <Skeleton width={150} />}</h2>
                {/* <p>{data?.description ?? <Skeleton height={16} width="100%" count={2} />}</p> */}
              </div>
            </div>
          </div>

          <div className="contact-us-box">
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="contact-info-box">
                  <h2>get in touch</h2>
                  <p className="desc">
                    If you like my work and have some cool project to work on, just send me direct
                    message or contact me through social sites listed below.
                  </p>
                  <div className="contact-info">
                    <span className="icon theme-bg">
                      <FontAwesomeIcon icon="directions" />
                    </span>
                    <p>
                      {`${data?.address?.addressLine1}
                    ${data?.address?.addressLine2}
                    ${data?.address?.city},${data?.address?.state} ${data?.address?.zipcode}`}
                    </p>
                  </div>

                  <If condition={!!data?.emails}>
                    <div className="contact-info">
                      <span className="icon theme-bg">
                        <FontAwesomeIcon icon="envelope" />
                      </span>
                      <p>
                        <For each="item" of={data?.emails}>
                          {item.email} <br />
                        </For>
                      </p>
                    </div>
                  </If>

                  <If condition={!!data?.phoneNumbers}>
                    <div className="contact-info">
                      <span className="icon theme-bg">
                        <FontAwesomeIcon icon="mobile-alt" />
                      </span>
                      <p>
                        <For each="item" of={data?.phoneNumbers}>
                          {item.phoneNumber} <br />
                        </For>
                      </p>
                    </div>
                  </If>
                </div>
              </div>
              <div className="col-md-6">
                {/* Contact Form */}
                <div className="contact-form">
                  <h2>Leave a Message</h2>
                  <form onSubmit={submitForm}>
                    <div className="form-group">
                      <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        type="text"
                        value={formData.name}
                        onChange={onChangeText}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="mobile"
                        name="mobile"
                        className="form-control"
                        type="tel"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={onChangeText}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="email"
                        id="email"
                        placeholder="Emaile"
                        className="form-control"
                        type="email"
                        value={formData.email}
                        onChange={onChangeText}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        className="form-control"
                        type="text"
                        value={formData.subject}
                        onChange={onChangeText}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Describe your project"
                        rows="3"
                        className="form-control"
                        value={formData.description}
                        onChange={onChangeText}
                        required
                      />
                    </div>
                    <div className="send">
                      <button type="submit" className="m-btn m-btn-theme" disabled={loading}>
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                {/* / */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <If condition={!!toast}>
        <div className="alertDiv">
          <Alert variant={toast.variant} onClose={() => setToast(null)} dismissible>
            <Alert.Heading>{toast.header}</Alert.Heading>
            <p>{toast.text}</p>
          </Alert>
        </div>
      </If>
    </>
  );
};

export default Contact;
