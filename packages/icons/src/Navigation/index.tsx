import { Map  } from "./Map";
import { Safari  } from "./Safari";
import { Pointer  } from "./Pointer";
import { MapMarker, MapMarkerOpen, MapMarkerEmpty, MapMarkerHashtag, MapMarkerHashtagOpen } from "./MapMarker";

type SubComponents = {
  Map: typeof Map;
  Safari: typeof Safari;
  Pointer: typeof Pointer;
  MapMarker: typeof MapMarker;
  MapMarkerOpen: typeof MapMarkerOpen;
  MapMarkerEmpty: typeof MapMarkerEmpty;
  MapMarkerHashtag: typeof MapMarkerHashtag;
  MapMarkerHashtagOpen: typeof MapMarkerHashtagOpen;
};

const Navigation: React.FC & SubComponents = () => {
  return <></>;
};

Navigation.Map = Map;
Navigation.Safari = Safari;
Navigation.Pointer = Pointer;
Navigation.MapMarker = MapMarker;
Navigation.MapMarkerOpen = MapMarkerOpen;
Navigation.MapMarkerEmpty = MapMarkerEmpty;
Navigation.MapMarkerHashtag = MapMarkerHashtag;
Navigation.MapMarkerHashtagOpen = MapMarkerHashtagOpen;

Navigation.displayName = "NavigationIcon";

export default Navigation;
