import { Download } from "./Download";
import { File, FileWithText } from "./File";
import { Folder } from "./Folder";
import { History } from "./History";
import { Image } from "./Image";
import { Save } from "./Save";
import { Upload } from "./Upload";

type SubComponents = {
  Upload: typeof Upload;
  Folder: typeof Folder;
  Download: typeof Download;
  File: typeof File;
  FileWithText: typeof FileWithText;
  Image: typeof Image;
  Save: typeof Save;
  History: typeof History;
};

const Files: React.FC & SubComponents = () => {
  return <></>;
};

Files.Upload = Upload;
Files.Folder = Folder;
Files.Download = Download;
Files.File = File;
Files.FileWithText = FileWithText;
Files.Image = Image;
Files.Save = Save;
Files.History = History;

Files.displayName = "FilesIcon";

export default Files;
