import { createIcon } from "@chakra-ui/icons";
import { IconSVG,EllipseFilled, Path, PathProps } from "../utils";

const QuestionMark: React.FC<PathProps> = (props) => (
  <Path
    d="M11.086 14.355c.01-.587.077-1.05.2-1.39.123-.34.375-.718.755-1.133l.969-.998c.414-.469.621-.972.621-1.51 0-.517-.135-.922-.407-1.213-.27-.296-.665-.444-1.183-.444-.503 0-.908.133-1.214.4-.305.266-.458.624-.458 1.073H9c.01-.8.293-1.443.85-1.931.563-.494 1.293-.74 2.19-.74.933 0 1.658.251 2.176.754.523.499.784 1.184.784 2.057 0 .863-.4 1.714-1.198 2.553l-.807.799c-.36.399-.54.974-.54 1.723h-1.369zm-.059 2.346c0-.222.067-.407.2-.555.138-.153.34-.23.607-.23.266 0 .468.077.606.23a.782.782 0 01.207.555.782.782 0 01-.207.554c-.138.143-.34.215-.606.215-.267 0-.469-.072-.607-.215a.798.798 0 01-.2-.554z"
    {...props}
  />
);

// @ts-expect-error
export const Question: IconSVG<{ Filled: typeof QuestionFilled }> = createIcon({
  displayName: "QuestionIcon",
  path: (
    <>
      <Path
        fillRule="evenodd"
        d="M12.5 20.5a8.5 8.5 0 100-17a8.5 8.5 0 000 17zm0 1.5c5.5 0 10-4.5 10-10s-4.5-10-10-10s-10 4.5-10 10s4.5 10 10 10z"
      />
    </>
  ),
});

export const QuestionFilled = createIcon({
  displayName: "QuestionFilledIcon",
  path: (
    <>
      <EllipseFilled />
      <QuestionMark fill="white" />
    </>
  ),
});

Question.Filled = QuestionFilled;
