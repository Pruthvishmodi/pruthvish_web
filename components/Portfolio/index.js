import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Carousel from 'react-bootstrap/Carousel';
import Modal from '../Modal/index';
import PortfolioList from '../PortfolioList';

const Portfolio = ({ data }) => {
  console.log(data?.projects);
  const [modalContent, setModalContent] = useState(null);

  return (
    <section id="portfolio" className="section gray-bg">
      <div className="container">
        <div className="row justify-content-center m-60px-b md-m-30px-b">
          <div className="col-12 col-md-10 col-lg-7">
            <div className="section-title text-center">
              <h2 className="font-alt">{data?.title ?? <Skeleton width={150} />}</h2>
              <p>{data?.description ?? <Skeleton height={16} width="100%" count={2} />}</p>
            </div>
          </div>
        </div>

        {/* Portfolio Filter */}
        <PortfolioList data={data} />

        <div className="d-flex justify-content-center m-50px-t md-m-25px-t">
          <Link href="/projects">
            <a className="m-btn m-btn-theme">
              View More Projects
              <FontAwesomeIcon icon="arrow-right" />
            </a>
          </Link>
        </div>

        <If condition={!!modalContent}>
          <Modal open={!!modalContent} onClose={() => setModalContent(null)}>
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
              <For each="item" of={modalContent || []}>
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
          </Modal>
        </If>
        {/* row */}
        {/* portfolio content */}
      </div>
      {/* Container */}
    </section>
  );
};

export default Portfolio;
