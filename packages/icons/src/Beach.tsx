import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path } from "./utils";

/*
 * <Beach />
 */

// @ts-expect-error
export const Beach: IconSVG<{ Filled: typeof BeachFilled }> = createIcon({
  displayName: "BeachIcon",
  path: (
    <>
      <Path
        fillRule="evenodd"
        d="M10.3 2.7c-.5.1-1 .4-1.5.9c-.3.3-.6.7-.7 1.1a2.2 2.2 0 00-.2.9l2.8-2.9a1.7 1.7 0 00-.4 0zM6.7 4.7c0-.1 0-.2.1-.3a3.7 3.7 0 00-.5-.7c-.5-.5-1-.8-1.5-.9a1.7 1.7 0 00-.4 0l1.4 1.5c.3.1.6.2.9.4zm-1.5.7c.1 0 .2.1.3.1c.3.1.5.2.7.3c.1.1.2.2.3.3H2.4c.1-.1.2-.2.3-.3c.4-.3 1-.5 1.7-.5c.3 0 .5 0 .8.1zm-1.3-1.3-1-1.1a.6.6 0 010-.9c.6-.6 1.4-.7 2.1-.6c.8.2 1.5.6 2.2 1.3c.1.1.2.2.3.3c.1-.2.3-.4.4-.5c.6-.7 1.4-1.1 2.2-1.3c.8-.2 1.6 0 2.1.6a.6.6 0 010 .9l-1 1.1c.7.1 1.3.3 1.9.7c.6.4 1.1 1.1 1.1 1.9c0 .3-.3.6-.6.6h-1.8c.5.6.8 1.2.9 1.8c.1.8 0 1.6-.5 2.2a.6.6 0 01-.9 0L7.6 7.5l-3.7 3.8a.6.6 0 01-.9 0c-.6-.6-.7-1.4-.5-2.2c.1-.6.4-1.3.9-1.8H1.5a.6.6 0 01-.6-.6c0-.8.5-1.5 1.1-1.9c.5-.3 1.2-.6 1.9-.7zm1.3 3.2a3.6 3.6 0 00-.6.5c-.5.5-.8 1.1-.9 1.6a1.9 1.9 0 000 .4l2.4-2.4h-.9zm3.8-.2 2.4 2.4a1.9 1.9 0 000-.4c-.1-.5-.4-1.1-.9-1.6a3.6 3.6 0 00-.6-.5H9zm.3-1.3h3.3a1.7 1.7 0 00-.3-.3c-.4-.3-1-.5-1.7-.5c-.3 0-.5 0-.7.1l-.6.7z"
      />
      <Path d="M18.87 7.907c-1.667 0-3.062 1.405-3.062 3.193s1.395 3.194 3.063 3.194c1.667 0 3.062-1.406 3.062-3.194s-1.395-3.193-3.063-3.193zM14.308 11.1c0-2.568 2.02-4.693 4.563-4.693 2.543 0 4.562 2.125 4.562 4.693 0 2.568-2.019 4.694-4.563 4.694-2.543 0-4.562-2.126-4.562-4.694zM7.015 6.7a.75.75 0 01.466.953l-2.855 8.31a.717.717 0 01-.007.02l-.565 1.643a.75.75 0 01-1.418-.488l.275-.8c-.234-.014-.475-.013-.804-.011h-.373a.75.75 0 010-1.5h.354c.495-.003.865-.005 1.324.053l2.65-7.715a.75.75 0 01.953-.465zm1.97.587a.75.75 0 01.478.947c-.645 1.96-1.084 3.412-1.525 4.87v.002c-.286.942-.572 1.888-.914 2.972a8.264 8.264 0 012.87 2.29c.863 1.086 1.413 2.377 1.413 3.632a.75.75 0 11-1.5 0c0-.83-.375-1.802-1.088-2.7a6.766 6.766 0 00-2.158-1.776c-.051.158-.104.32-.159.484a.75.75 0 01-1.425-.468c.147-.445.283-.864.41-1.263l.003-.01a224.92 224.92 0 001.112-3.597v-.002c.442-1.459.886-2.925 1.535-4.902a.75.75 0 01.947-.479zm4.234 10.544a.75.75 0 01.75-.75h9.53a.75.75 0 110 1.5h-9.53a.75.75 0 01-.75-.75zm.817 1.69a.75.75 0 01.75-.75h7.625a.75.75 0 010 1.5h-7.625a.75.75 0 01-.75-.75zm1.089 1.69a.75.75 0 01.75-.75h5.719a.75.75 0 010 1.5h-5.719a.75.75 0 01-.75-.75z" />
    </>
  ),
});

export const BeachFilled = createIcon({
  displayName: "BeachFilledIcon",
  d:
    "M3.346 4.115l-1.03-1.057a.625.625 0 010-.873c.57-.585 1.382-.705 2.136-.55c.757.155 1.529.594 2.168 1.25c.101.103.197.21.287.32c.133-.179.28-.353.442-.518c.639-.656 1.41-1.095 2.168-1.25c.753-.155 1.566-.034 2.136.55a.625.625 0 010 .873l-1.03 1.057c.699.08 1.341.31 1.851.658c.637.435 1.12 1.101 1.12 1.914c0 .345-.28.625-.625.625h-1.805c.456.57.762 1.211.884 1.838c.148.759.034 1.579-.531 2.159a.625.625 0 01-.895 0L7.08 7.479l-3.734 3.83a.625.625 0 01-.895 0c-.566-.58-.68-1.4-.531-2.16c.122-.626.428-1.267.884-1.837H1a.625.625 0 01-.625-.625c0-.813.482-1.48 1.12-1.915c.51-.348 1.152-.578 1.851-.657zM14.308 10.1c0-2.568 2.019-4.693 4.563-4.693c2.543 0 4.562 2.125 4.562 4.693c0 2.568-2.019 4.694-4.563 4.694c-2.543 0-4.562-2.126-4.562-4.694zM13.219 16.831a.75.75 0 01.75-.75h9.53a.75.75 0 010 1.5h-9.53a.75.75 0 01-.75-.75zM14.036 19.02a.75.75 0 01.75-.75h7.625a.75.75 0 010 1.5h-7.625a.75.75 0 01-.75-.75zM15.125 21.211a.75.75 0 01.75-.75h5.719a.75.75 0 010 1.5h-5.719a.75.75 0 01-.75-.75zM3.704 17.79c2.255-3.275 2.626-7.099 2.965-10.068a.738.738 0 011.399-.235l.047.097a.815.815 0 01.075.446c-.348 3.106-.633 7.25-3.161 10.622a.775.775 0 01-.435.307a1.39 1.39 0 01-.766-.026c-.43-.147-.4-.742-.124-1.143zM6.486 17.321c-1.542-.807-3.326-1.076-4.483-1.071a.75.75 0 01-.006-1.5c1.34-.006 3.378.297 5.184 1.242c1.83.957 3.469 2.606 3.81 5.266a.75.75 0 11-1.489.19c-.262-2.049-1.497-3.332-3.016-4.127z",
});

Beach.Filled = BeachFilled;

/*
 * <BeachBall />
 */

// @ts-expect-error
export const BeachBall: IconSVG<{
  Filled: typeof BeachBallFilled;
}> = createIcon({
  displayName: "BeachBallIcon",
  d:
    "M9.746 3.027C5.726 4.033 2.75 7.669 2.75 12c0 .207.007.412.02.616 3.24-5.883 7.785-6.829 10.14-6.08a3.265 3.265 0 011.041-.894 6.19 6.19 0 00-.029-.031c-.288-.302-.711-.653-1.216-1.008-.948-.667-2.083-1.279-2.96-1.576zm2.896-.255c.322.194.635.398.927.604.551.388 1.06.802 1.439 1.2a3.692 3.692 0 01.52.674c.579.005 1.12.161 1.59.43l.794-.794a9.205 9.205 0 00-5.27-2.114zm6.342 3.163l-.773.773a3.235 3.235 0 01.505 2.261c.617.603 1.395 1.531 2.057 2.496.165.24.325.486.475.733L21.25 12c0-2.32-.854-4.44-2.266-6.065zm1.803 8.963c-.024-.236-.126-.578-.33-1.017a11.385 11.385 0 00-.92-1.567c-.475-.692-1.001-1.344-1.454-1.84l-.083.103c.059.197.096.404.118.61.048.441.035.95-.038 1.49-.144 1.085-.533 2.365-1.218 3.632-1.028 1.902-2.737 3.791-5.312 4.93a9.254 9.254 0 009.237-6.34zM8.574 20.596c3.618-.683 5.797-2.832 6.969-5 .6-1.11.93-2.216 1.05-3.116.048-.357.062-.672.049-.935-.355.133-.74.206-1.142.206a3.235 3.235 0 01-1.709-.485L5.94 18.988a9.246 9.246 0 002.634 1.607zM4.89 17.917l7.842-7.713a3.235 3.235 0 01-.433-2.27c-1.737-.4-6.059.178-9.04 7.099a9.234 9.234 0 001.63 2.884zM1.25 12C1.25 6.063 6.063 1.25 12 1.25c2.93 0 5.587 1.173 7.525 3.073A10.72 10.72 0 0122.75 12c0 5.937-4.813 10.75-10.75 10.75a10.72 10.72 0 01-7.677-3.225A10.717 10.717 0 011.25 12zM15.5 6.75a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5z",
});

export const BeachBallFilled = createIcon({
  displayName: "BeachBallFilledIcon",
  path: (
    <>
      <Path d="M.8 12C.8 6.1 5.6 1.3 11.5 1.3c2.9 0 5.6 1.2 7.5 3.1A10.7 10.7 0 0122.3 12c0 5.9-4.8 10.8-10.8 10.8a10.7 10.7 0 01-7.7-3.2A10.7 10.7 0 01.8 12z" />
      <Path
        fill="white"
        fillRule="evenodd"
        d="M9.246 3.027C5.226 4.033 2.25 7.669 2.25 12c0 .207.007.412.02.616c3.24-5.883 7.785-6.829 10.14-6.08a3.265 3.265 0 011.041-.894a6.19 6.19 0 00-.029-.031c-.288-.302-.711-.653-1.216-1.008c-.948-.667-2.083-1.279-2.96-1.576zm2.896-.255c.322.194.635.398.927.604c.551.388 1.06.802 1.439 1.2a3.692 3.692 0 01.52.674c.579.005 1.12.161 1.59.43l.794-.794a9.205 9.205 0 00-5.27-2.114zm6.342 3.163-.773.773a3.235 3.235 0 01.505 2.261c.617.603 1.395 1.531 2.057 2.496c.165.24.325.486.475.733L20.75 12c0-2.32-.854-4.44-2.266-6.065zm1.803 8.963c-.024-.236-.126-.578-.33-1.017a11.385 11.385 0 00-.92-1.567c-.475-.692-1.001-1.344-1.454-1.84l-.083.103c.059.197.096.404.118.61c.048.441.035.95-.038 1.49c-.144 1.085-.533 2.365-1.218 3.632c-1.028 1.902-2.737 3.791-5.312 4.93a9.254 9.254 0 009.237-6.34zM8.074 20.596c3.618-.683 5.797-2.832 6.969-5c.6-1.11.93-2.216 1.05-3.116c.048-.357.062-.672.049-.935c-.355.133-.74.206-1.142.206a3.235 3.235 0 01-1.709-.485L5.44 18.988a9.246 9.246 0 002.634 1.607zM4.39 17.917l7.842-7.713a3.235 3.235 0 01-.433-2.27c-1.737-.4-6.059.178-9.04 7.099a9.234 9.234 0 001.63 2.884zM.75 12C.75 6.063 5.563 1.25 11.5 1.25c2.93 0 5.587 1.173 7.525 3.073A10.72 10.72 0 0122.25 12c0 5.937-4.813 10.75-10.75 10.75a10.72 10.72 0 01-7.677-3.225A10.717 10.717 0 01.75 12zM15 6.75a1.75 1.75 0 100 3.5a1.75 1.75 0 000-3.5z"
      />
    </>
  ),
});

BeachBall.Filled = BeachBallFilled;

/*
 * <BeachChair />
 */
export const BeachChair = createIcon({
  displayName: "BeachChairIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M3.8 2.5l-.1-.2L.9 3.8l4.5 10.7L2.8 20.2l2.3 1.6L7.7 16h6v6h3v-6h3.1l2.1 5.3 2.3-1.6-2.7-6.2h-1a5.5 5.5 0 00-.3-.9c-.2-.3-.4-.6-.7-.8c-.3-.2-.7-.3-1-.3c-.4 0-.8 0-1.4 0H16.7v-4H8l-.3.7-.9-4 0-.1c-.3-.6-.8-1.1-1.4-1.4a2.7 2.7 0 00-1.7-.2zm3.3 7.4L5.9 4.6c-.2-.4-.5-.7-.9-.9a1.6 1.6 0 00-.9-.2l2.7 7.1.2-.6zm9.6 2.5v1h2.7a3.5 3.5 0 00-.2-.4c-.1-.2-.2-.3-.3-.4c-.1-.1-.3-.1-.6-.1c-.3 0-.7 0-1.3 0h-.3zm0 2v.5h3.8l1.9 4.7.6-.4L20.7 14.5h-4.1zm-3 .5v-.5H8.4l-.2.5h5.6zm-4.9-1.5h4.9v-1H9.2l-.4 1zm.9-2h4.1v-1.3h-3.6l-.5 1.3zm-1.2.3 1-2.6h5.2V21h1V8.5H8.7l-1.8 4.9-3.7-9.7-1 .5 4.3 10.3-2.4 5.3.6.4 3.8-8.4z"
    />
  ),
});

/*
 * <BeachUmbrella />
 */

// @ts-expect-error
export const BeachUmbrella: IconSVG<{
  Filled: typeof BeachUmbrellaFilled;
  FilledOneSide: typeof BeachUmbrellaFilledOneSide;
}> = createIcon({
  displayName: "BeachUmbrellaIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M14.436 2.18A8.183 8.183 0 0013 2c-.451.016-.933.07-1.43.157-1.998.35-4.232 1.239-5.618 2.345C4.395 5.745 3.274 7.4 2.73 9.234a8.8 8.8 0 00-.222.922.493.493 0 00.166.468c.132.11.31.137.465.069l.006-.003c.244-.11.481-.205.711-.285l.138-.046.003-.001c1.545-.504 2.777-.36 3.605-.104l.012.004c.26.08.479.172.655.258.16.078.285.15.373.206.067.043.174.07.267.082A.756.756 0 009 10.81c.104 0 .149-.03.239-.09l.006-.004a5.13 5.13 0 01.853-.456l.013-.005c.077-.033.155-.063.233-.092l.015-.005a6.51 6.51 0 011.243-.316l-.094 11.188c-.004.535.42.97.945.97.522 0 .945-.43.945-.961V9.842a6.369 6.369 0 011.522.426l.015.007a5.29 5.29 0 01.82.441.547.547 0 00.603.006c.144-.091.39-.23.729-.36.19-.073.408-.143.654-.2l.012-.003c.81-.187 1.912-.237 3.25.199h.003a8.352 8.352 0 01.849.331l.002.002h.002c.156.07.335.044.467-.067a.494.494 0 00.166-.468 9.01 9.01 0 00-.124-.566v-.002l-.005-.018-.002-.009-.005-.019-.001-.004a9.073 9.073 0 00-.085-.304c-.544-1.834-1.665-3.489-3.222-4.732-1.357-1.083-2.913-1.957-4.612-2.322zm6.025 6.487a8.163 8.163 0 00-2.349-2.992A11.557 11.557 0 0015.9 4.264c.243.518.431 1.055.578 1.594.27.988.409 2.01.495 2.959.878-.269 2.063-.43 3.488-.15zM15.434 8.5a14.532 14.532 0 00-.403-2.248c-.277-1.013-.695-1.937-1.345-2.685A6.568 6.568 0 0013 3.501c-.232.01-.473.032-.721.064-.731.777-1.264 1.744-1.65 2.793-.273.74-.467 1.506-.605 2.251a9.489 9.489 0 011.874-.467v-.05l.17.027c.301-.038.596-.062.881-.071L13 8.046l.05.002c.763.025 1.462.126 2.168.373.073.025.145.052.216.08zm-6.99.46c.151-1 .393-2.077.777-3.12.22-.596.488-1.188.817-1.752-1.21.397-2.367.961-3.15 1.587a8.163 8.163 0 00-2.349 2.992c1.666-.328 3.004-.052 3.905.293zm-.304.627h-.001l.19.271v-.001l-.19-.27zm4.868 11.456v-.004.004z"
    />
  ),
});

export const BeachUmbrellaFilled = createIcon({
  displayName: "BeachUmbrellaFilledIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M13.936 2.18A8.183 8.183 0 0012.5 2c-.451.016-.933.07-1.43.157-1.998.35-4.232 1.239-5.618 2.345C3.895 5.745 2.774 7.4 2.23 9.234a8.8 8.8 0 00-.222.922.493.493 0 00.166.468c.132.11.31.137.465.069l.006-.003a8.362 8.362 0 01.849-.331l.003-.001c1.545-.504 2.777-.36 3.605-.104l.012.004c.26.08.479.172.655.258.16.078.285.15.373.206.067.043.174.07.267.082a.756.756 0 00.091.006c.104 0 .149-.03.239-.09l.006-.004a5.13 5.13 0 01.853-.456l.013-.005c.077-.033.155-.063.233-.092l.015-.005a6.51 6.51 0 011.243-.316l-.094 11.188c-.004.535.42.97.945.97.522 0 .945-.43.945-.961V9.842a6.369 6.369 0 011.522.426l.015.007a5.29 5.29 0 01.82.441.547.547 0 00.603.006c.144-.091.39-.23.729-.36.19-.073.408-.143.654-.2l.012-.003c.81-.187 1.912-.237 3.25.199h.003a8.2 8.2 0 01.849.332l.002.001h.002c.156.07.335.044.467-.067a.494.494 0 00.166-.468 9.01 9.01 0 00-.124-.566v-.002l-.005-.018-.002-.009-.005-.019-.001-.004a9.073 9.073 0 00-.085-.304c-.544-1.834-1.665-3.489-3.222-4.732-1.357-1.083-2.913-1.957-4.612-2.322zm.998 6.32a14.532 14.532 0 00-.403-2.248c-.277-1.013-.695-1.937-1.345-2.685a6.568 6.568 0 00-.686-.066c-.232.01-.473.032-.721.064-.731.777-1.264 1.744-1.65 2.793-.273.74-.467 1.506-.605 2.251a9.49 9.49 0 011.874-.467v-.05l.17.027c.301-.038.596-.062.881-.071l.051-.002.05.002c.763.025 1.462.126 2.168.373.073.025.145.052.216.08z"
    />
  ),
});

export const BeachUmbrellaFilledOneSide = createIcon({
  displayName: "BeachUmbrellaFilledOneSideIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M13.936 2.18A8.183 8.183 0 0012.5 2c-.451.016-.933.07-1.43.157-1.998.35-4.232 1.239-5.618 2.345C3.895 5.745 2.774 7.4 2.23 9.234a8.8 8.8 0 00-.222.922.493.493 0 00.166.468c.132.11.31.137.465.069l.006-.003a8.362 8.362 0 01.849-.331l.003-.001c1.545-.504 2.777-.36 3.605-.104l.012.004c.26.08.479.172.655.258.16.078.285.15.373.206.067.043.174.07.267.082a.756.756 0 00.091.006c.104 0 .149-.03.239-.09l.006-.004a5.13 5.13 0 01.853-.456l.013-.005c.077-.033.155-.063.233-.092l.015-.005a6.51 6.51 0 011.243-.316l-.094 11.188c-.004.535.42.97.945.97.522 0 .945-.43.945-.961V9.842a6.369 6.369 0 011.522.426l.015.007a5.29 5.29 0 01.82.441.547.547 0 00.603.006c.144-.091.39-.23.729-.36.19-.073.408-.143.654-.2l.012-.003c.81-.187 1.912-.237 3.25.199h.003a8.2 8.2 0 01.849.332l.002.001h.002c.156.07.335.044.467-.067a.494.494 0 00.166-.468 9.01 9.01 0 00-.124-.566v-.002l-.005-.018-.002-.009-.005-.019-.001-.004a9.073 9.073 0 00-.085-.304c-.544-1.834-1.665-3.489-3.222-4.732-1.357-1.083-2.913-1.957-4.612-2.322zm6.025 6.487a8.163 8.163 0 00-2.349-2.992A11.557 11.557 0 0015.4 4.264c.243.518.431 1.055.578 1.594.27.988.409 2.01.495 2.959.878-.269 2.063-.43 3.488-.15zM7.944 8.96c.151-1 .393-2.077.777-3.12.22-.596.488-1.188.817-1.752-1.21.397-2.367.961-3.15 1.587a8.163 8.163 0 00-2.349 2.992c1.666-.328 3.004-.052 3.905.293z"
    />
  ),
});

BeachUmbrella.Filled = BeachUmbrellaFilled;
BeachUmbrella.FilledOneSide = BeachUmbrellaFilledOneSide;