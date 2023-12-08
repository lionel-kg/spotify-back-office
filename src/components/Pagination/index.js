import {useState, useEffect} from 'react';
import styles from './index.module.scss';

const Index = props => {
  const {currentPage, totalPages, onPageChange} = props;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const generatePages = () => {
      const pageArray = [];
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
      }
      setPages(pageArray);
    };

    generatePages();
  }, [totalPages]);

  return (
    <div className={styles.pagination}>
      {totalPages > 1 && (
        <ul>
          {pages.map(page => (
            <li key={page}>
              {page === currentPage ? (
                <span>{page}</span>
              ) : (
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(page);
                  }}>
                  {page}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Index;
