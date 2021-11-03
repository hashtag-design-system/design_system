import { AlertCircle, AlertTriangle } from "./Alert";
import { Info } from "./Info";
import { ParkingSign } from "./ParkingSign";
import { Question } from "./Question";

type SubComponents = {
  AlertCircle: typeof AlertCircle;
  AlertTriangle: typeof AlertTriangle;
  Question: typeof Question;
  Info: typeof Info;
  ParkingSign: typeof ParkingSign;
};

const Notification: React.FC & SubComponents = () => {
  return <></>;
};

Notification.AlertCircle = AlertCircle;
Notification.AlertTriangle = AlertTriangle;
Notification.Question = Question;
Notification.Info = Info;
Notification.ParkingSign = ParkingSign;

Notification.displayName = "NotificationIcon";

export default Notification;
