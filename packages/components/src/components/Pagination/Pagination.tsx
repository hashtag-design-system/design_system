import React, { useCallback, useEffect, useState } from "react";
import { listKeys } from "../../config";
import { range } from "../../utils";
import { useClassnames } from "../../utils/hooks";
import Button from "../Button";
import { ComponentProps } from "../__helpers__";
import { AnchorLink, Icon } from "./__helpers__";

// See -> https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react#step-4-%E2%80%94-building-the-app-component

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

export type Props = {
  totalPages: number;
  currentPage?: number;
  marginPageCount?: number;
  surroundingPageCount?: number;
  showPageCount?: boolean;
  showBtn?: boolean | "previous" | "next";
  hideIfOne?: boolean;
  onPageChanged?: (e: React.MouseEvent<HTMLElement>, page: number) => void;
  hrefBuilder?: (page: number) => string;
};

export type FProps = Props & ComponentProps<"nav">;

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage = 1,
  marginPageCount = 1,
  surroundingPageCount = 2,
  showPageCount = true,
  showBtn = true,
  hideIfOne = true,
  onPageChanged,
  hrefBuilder,
  ...props
}) => {
  const [page, setPage] = useState<number>(currentPage);
  const [classNames, rest] = useClassnames("pagination__nav", props);

  const goToPage = useCallback(
    (page: number, e?: React.MouseEvent<HTMLElement>) => {
      const nextPage = Math.max(0, Math.min(page, totalPages));

      if (onPageChanged && e) {
        return onPageChanged(e, nextPage);
      }

      setPage(nextPage);
    },
    [totalPages, onPageChanged]
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, page: React.ReactText) => {
    const serializedPageNumber = parseInt(page.toString());
    e.preventDefault();
    goToPage(serializedPageNumber, e);
  };

  const handleMoveLeft = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToPage(page - surroundingPageCount * 2 - 1, e);
  };

  const handleMoveRight = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToPage(page + surroundingPageCount * 2 + 1, e);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * ----
   * (x) => terminal pages: first and last page(always visible)
   *
   * [x] => represents current page
   *
   * {...x} => represents page neighbours
   */
  const calculatePages = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBoxes: totalNumbers + 2 to cover for the left(<) and right(>) controls,
     * and marginPageCount boxes
     */
    const totalNumbers = surroundingPageCount * 2 + 3;
    const totalBoxes = totalNumbers + marginPageCount * 2;

    if (totalPages > totalBoxes) {
      const startPage = Math.max(2, page - surroundingPageCount);
      const endPage = Math.min(totalPages - 1, page + surroundingPageCount);
      let pages: (string | number)[] = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > marginPageCount * 2;
      const hasRightSpill = totalPages - endPage > marginPageCount;
      const spillOffset = totalNumbers - (pages.length + marginPageCount);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      let totalStart: number[] = [];
      for (let i = 0; i < marginPageCount; i++) {
        totalStart = [...totalStart, i + 1];
      }

      let totalEnd: number[] = [];
      for (let i = 0; i < marginPageCount; i++) {
        totalEnd = [totalPages - i, ...totalEnd];
      }

      return new Set([...totalStart, ...pages, ...totalEnd]);
    }

    return range(1, totalPages);
  };

  useEffect(() => {
    goToPage(page);
  }, [page, goToPage]);

  if (hideIfOne && totalPages === 1) {
    return null;
  }

  const pages = calculatePages();

  return (
    <nav aria-label="Pagination" className={classNames} data-testid="pagination" {...rest}>
      {(showBtn === "previous" || showBtn === true) && totalPages !== 1 && (
        <Button
          variant="secondary"
          state={page === 1 ? "disabled" : "default"}
          className="pagination__btn previous"
          data-testid="pagination-btn-previous"
          onClick={e => goToPage(page - 1, e)}
        >
          <Icon d="M17 21L7 12l10-9" />
          Previous
        </Button>
      )}
      {showPageCount &&
        Array.from(pages).map((pageNum, i) => {
          const serializedPageNumber = parseInt(pageNum.toString());
          if (pageNum === LEFT_PAGE)
            return (
              <AnchorLink
                spread
                key={listKeys.PAGINATION_LINK + i}
                pageNum={serializedPageNumber || i + 1}
                aria-label="Previous"
                onClick={e => handleMoveLeft(e)}
              />
            );

          if (pageNum === RIGHT_PAGE)
            return (
              <AnchorLink
                spread
                key={listKeys.PAGINATION_LINK + i}
                pageNum={serializedPageNumber || i + 1}
                aria-label="Next"
                onClick={e => handleMoveRight(e)}
              />
            );

          return (
            <AnchorLink
              key={listKeys.PAGINATION_LINK + i}
              pageNum={serializedPageNumber}
              className={serializedPageNumber === page ? "active" : undefined}
              href={hrefBuilder && hrefBuilder(serializedPageNumber)}
              onClick={e => handleClick(e, pageNum)}
            >
              {pageNum}
            </AnchorLink>
          );
        })}
      {(showBtn === "next" || showBtn === true) && totalPages !== 1 && (
        <Button
          variant="secondary"
          state={page === totalPages ? "disabled" : "default"}
          className="pagination__btn next"
          data-testid="pagination-btn-next"
          onClick={e => goToPage(page + 1, e)}
        >
          Next
          <Icon d="M7 21l10-9L7 3" />
        </Button>
      )}
    </nav>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
