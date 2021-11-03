import { createIcon } from "@chakra-ui/icons";
import { IconSVG, Path, PathProps } from "../utils";

const HashtagPath: React.FC<PathProps> = ({
  fillRule = "evenodd",
  ...props
}) => (
  <Path
    fillRule={fillRule}
    d="M14.313 6.595L13.975 8.5h1.192v1h-1.37l-.154.867h1.124v1h-1.302l-.394 2.213-.984-.175.362-2.038h-.584l-.394 2.213-.984-.175.362-2.038H9.5v-1h1.527l.154-.867H9.767v-1h1.592l.37-2.08.984.175-.338 1.905h.584l.37-2.08.984.175zM12.781 9.5h-.584l-.154.867h.584l.154-.867z"
    {...props}
  />
);

/*
 * <MapMarker />
 */

// @ts-expect-error
export const MapMarker: IconSVG<{
  Filled: typeof MapMarkerFilled;
}> = createIcon({
  displayName: "MapMarkerIcon",
  path: (
    <>
      <Path d="M15.5 9a3 3 0 11-6 0a3 3 0 016 0z" />
      <Path
        fillRule="evenodd"
        d="M12.5 18.6l4.5-6.5a5.5 5.5 0 10-9 0l4.5 6.5zm5.7-5.6a7 7 0 10-11.5 0l5.5 7.9c.1.1.3.1.4 0l5.5-7.9z"
      />
    </>
  ),
});

export const MapMarkerFilled = createIcon({
  displayName: "MapMarkerFilledIcon",
  path: (
    <>
      <Path d="M17.7 13a7 7 0 10-11.5 0l5.5 7.9c.1.1.3.1.4 0l5.5-7.9z" />
      <Path fill="white" d="M15 9a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
});

MapMarker.Filled = MapMarkerFilled;

/*
 * <MapMarkerEmpty />
 */

// @ts-expect-error
export const MapMarkerEmpty: IconSVG<{
  Filled: typeof MapMarkerEmptyFilled;
}> = createIcon({
  displayName: "MapMarkerEmptyIcon",
  path: (
    <Path
      fillRule="evenodd"
      d="M12 20.035l5.131-7.204a5.99 5.99 0 00-.703-7.786c-2.443-2.393-6.414-2.393-8.856 0a5.99 5.99 0 00-.704 7.786L12 20.035zm6.15-6.478a7.24 7.24 0 00-.847-9.404c-2.929-2.87-7.677-2.87-10.606 0a7.24 7.24 0 00-.847 9.404l5.938 8.335c.103.144.32.144.424 0l5.938-8.335z"
    />
  ),
});

export const MapMarkerEmptyFilled = createIcon({
  displayName: "MapMarkerEmptyFilledIcon",
  d:
    "M17.6 13.6a7.2 7.2 0 00-.8-9.4c-2.9-2.9-7.7-2.9-10.6 0a7.2 7.2 0 00-.8 9.4l5.9 8.3c.1.1.3.1.4 0l5.9-8.3z",
});

MapMarkerEmpty.Filled = MapMarkerEmptyFilled;

/*
 * <MapMarkerOpen />
 */
export const MapMarkerOpen = createIcon({
  d:
    "M15.5 10a3 3 0 11-6 0a3 3 0 016 0zM16.894 5.585c-2.433-2.432-6.398-2.452-8.822-.027a6.219 6.219 0 00-.702 7.957l5.11 7.32 2.04-2.827a.75.75 0 111.216.878l-2.461 3.409a.99.99 0 01-1.614-.013L6.14 14.374a7.719 7.719 0 01.87-9.877c3.02-3.018 7.934-2.983 10.944.028c2.622 2.621 3.058 6.756.998 9.848l-.707 1.063a.75.75 0 01-1.249-.832l.708-1.062c1.659-2.491 1.312-5.835-.81-7.957z",
  displayName: "MapMarkerOpenIcon",
});

/*
 * <MapMarkerHashtag />
 */

// @ts-expect-error
export const MapMarkerHashtag: IconSVG<{
  Filled: typeof MapMarkerHashtagFilled;
}> = createIcon({
  displayName: "MapMarkerHashtagIcon",
  path: (
    <>
      <HashtagPath />
      <Path
        fillRule="evenodd"
        d="M17.016 4.683a6.6 6.6 0 00-10.078 8.444l5.412 7.752 5.411-7.752a6.6 6.6 0 00-.745-8.444zM6.622 3.623a8.1 8.1 0 0112.369 10.363l-5.819 8.335c-.4.572-1.246.572-1.645 0l-5.819-8.335a8.1 8.1 0 01.914-10.364z"
      />
    </>
  ),
});

export const MapMarkerHashtagFilled = createIcon({
  displayName: "MapMarkerHashtagFilledIcon",
  path: (
    <>
      <Path d="M6.122 3.622a8.1 8.1 0 0112.369 10.364l-5.819 8.335c-.4.572-1.246.572-1.645 0l-5.819-8.335a8.1 8.1 0 01.914-10.364z" />
      <HashtagPath
        fill="white"
        d="M13.813 6.595L13.475 8.5h1.192v1h-1.37l-.154.867h1.124v1h-1.302l-.394 2.213-.984-.175.362-2.038h-.584l-.394 2.213-.984-.175.362-2.038H9v-1h1.527l.154-.867H9.267v-1h1.592l.37-2.08.984.175-.338 1.905h.584l.37-2.08.984.175zM12.281 9.5h-.584l-.154.867h.584l.154-.867z"
      />
    </>
  ),
});

MapMarkerHashtag.Filled = MapMarkerHashtagFilled;

/*
 * <MapMarkerHashtagOpen />
 */
export const MapMarkerHashtagOpen = createIcon({
  displayName: "MapMarkerHashtagOpenIcon",
  path: (
    <>
      <Path
        fillRule="evenodd"
        d="M17.051 4.698c-2.582-2.582-6.792-2.603-9.367-.028a6.603 6.603 0 00-.745 8.448l5.424 7.77 2.188-3.029a.75.75 0 011.216.878l-2.597 3.597c-.404.56-1.24.553-1.636-.013l-5.825-8.344a8.103 8.103 0 01.914-10.368C9.792.44 14.951.477 18.112 3.638c2.752 2.752 3.21 7.093 1.047 10.34l-.746 1.12a.75.75 0 11-1.249-.831l.747-1.121c1.761-2.645 1.393-6.195-.86-8.448z"
      />
      <HashtagPath />
    </>
  ),
});
