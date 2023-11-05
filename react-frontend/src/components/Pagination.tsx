import {Dispatch, FC, SetStateAction} from "react";
import {Button} from "./ui/button.tsx";

type Props = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  itemsCount: number;
  itemsPerPage: number;
};

const Pagination: FC<Props> = ({page, setPage, itemsCount, itemsPerPage}) => {
  const pages = Math.ceil(itemsCount / itemsPerPage);
  return (
    <div className="flex flex-row flex-wrap mt-5">
      {[...Array(pages)].map((_, index) => (
        <Button
          key={index}
          variant="secondary"
          size="sm"
          className={`mx-1 px-3 py-2 rounded-full ${
            index + 1 === page ? "" : ""
          }`}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </Button>
      ))
      }
    </div>
  );
};

export default Pagination;
