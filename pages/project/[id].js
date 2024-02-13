import { useRouter } from 'next/router';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from 'react-bootstrap/Carousel';
import useProject from '../../hooks/useProject';

const PortfolioDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useProject(id);

  if (error) return <div>failed to load</div>;

  return (
    <>
      <Head>
        <title>{data?.project.projectName}</title>
      </Head>
      <section className="page-title" style={{ backgroundColor: 'black' }}>
        <div className="container">
          <h1 className="font-alt">Project Details</h1>
        </div>
        {/* container */}
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <Carousel
                indicators={false}
                nextIcon={
                  <span
                    style={{
                      display: 'flex',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 0,
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-right" color="#fff" fixedWidth />
                  </span>
                }
                prevIcon={
                  <span
                    style={{
                      display: 'flex',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 0,
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-left" color="#fff" fixedWidth />
                  </span>
                }
              >
                <For each="item" of={data?.project.images || []}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={item.url.replace('upload/', 'upload/c_fill/c_scale,w_auto,dpr_auto/')}
                      title="Pruthvish"
                      alt="Pruthvish"
                    />
                  </Carousel.Item>
                </For>
              </Carousel>
            </div>
            <div className="col-md-1 m-35px-b" />
            <div className="col-md-6">
              <div className="sidebar-widget">
                <h2
                  style={{
                    fontSize: 35,
                    fontWeight: '600',
                    color: '#151515',
                  }}
                >
                  {data?.project.projectName}
                </h2>
              </div>

              <div className="sidebar-widget">
                <h2 className="title-style-1 font-alt">Role</h2>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#151515',
                  }}
                >
                  {data?.project.role}
                </h3>
              </div>

              <If condition={!!data?.project.categories}>
                <div className="sidebar-widget">
                  <h2 className="title-style-1 font-alt">Project Categories</h2>
                  <div className="widget-popular-tag">
                    <ul className="list-style-tag">
                      <For each="item" of={data?.project.categories}>
                        <li>
                          <a href="#" target="_blank" rel="noreferrer nooper">
                            {item.categoryName}
                          </a>
                        </li>
                      </For>
                    </ul>
                  </div>
                </div>
              </If>

              <If condition={!!data?.project.skills}>
                <div className="sidebar-widget">
                  <h2 className="title-style-1 font-alt">Technology Used</h2>
                  <div className="widget-popular-tag">
                    <ul className="list-style-tag">
                      <For each="item" of={data?.project.skills}>
                        <li>
                          <a href={item.link} target="_blank" rel="noreferrer nooper">
                            {item.name}
                          </a>
                        </li>
                      </For>
                    </ul>
                  </div>
                </div>
              </If>

              <If condition={!!data?.project.Description}>
                <div className="sidebar-widget">
                  <h2 className="title-style-1 font-alt">Project Description</h2>
                  <p>{data?.project.Description}</p>
                </div>
              </If>

              <If condition={!!data?.project.link}>
                <div className="sidebar-widget">
                  <h2 className="title-style-1 font-alt">Visit Link</h2>
                  <a
                    href={data?.project.link}
                    target="_blank"
                    rel="noreferrer nooper"
                    style={{
                      fontWeight: '600',
                      color: '#333',
                    }}
                  >
                    {data?.project.link}
                  </a>
                </div>
              </If>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioDetails;
