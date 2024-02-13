import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import './blogList.module.css';

const BlogList = ({ data }) => {
  return (
    <div className="row">
      <For each="item" index="idx" of={data?.blogs}>
        <div
          className={classNames(
            'col-12',
            'col-lg-4',
            { 'col-md-6': data.blogs.length !== idx + 1 },
            { 'col-md-12': data.blogs.length === idx + 1 },
          )}
        >
          <div className="blog-item  md-m-15px-tb">
            <Link href="/post/[id]" as={`/post/${item.id}`}>
              <a aria-label="blog image">
                <img
                  className="lazyload d-block w-100"
                  data-src={
                    item.image.url.replace(
                      'upload/',
                      'upload/ar_4:3,c_fill/c_scale,w_auto,dpr_auto/',
                    ) || 'static/img/placeholder-750x500.png'
                  }
                  title="Pruthvish"
                  alt="Pruthvish"
                />
              </a>
            </Link>
            <div className="blog-content">
              <div className="post-meta">
                By
                <a href="#" aria-label="name">
                  PruthvishModi
                </a>
                <span>03.02.2018</span>
              </div>

              <h4>
                <Link href="/post/[id]" as={`/post/${item.id}`}>
                  <a className="theme-color" aria-label="description">
                    {item.Title}
                  </a>
                </Link>
              </h4>
              <p>{item.description}</p>
              <Link href="/post/[id]" as={`/post/${item.id}`}>
                <a className="more-btn" aria-label="Read More">
                  Read More
                  <FontAwesomeIcon icon="arrow-right" className="arrowRight" />
                </a>
              </Link>
            </div>
            {/* /blog-content */}
          </div>
          {/* Blog Item */}
        </div>
      </For>
    </div>
  );
};

export default BlogList;
