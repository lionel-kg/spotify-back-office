import {useState, useEffect} from 'react';
import styles from './index.module.scss';

const Pagination = props => {
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
          {currentPage > 1 && (
            <li>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }}>
                Précédent
              </a>
            </li>
          )}

          <li key={currentPage} className={styles.currentPage}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onPageChange(currentPage);
              }}>
              {currentPage}
            </a>
          </li>

          {currentPage < totalPages && (
            <li>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }}>
                Suivant
              </a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Pagination;
