import Button from '@mui/material/Button';

export const UploadButton = ({ children, className = '', ...rest }) => {
  return (
    <label htmlFor="contained-button-file">
      <input className={`input ${className}`} id="contained-button-file" type="file" {...rest} />
      <Button variant="contained" color="secondary" component="span">
        {children}
      </Button>
    </label>
  );
};

export const UploadVolunteerFilesButton = ({ onChange }) => {
  return (
    <UploadButton onChange={onChange} accept=".pdf,.docx,image/*" name="files" multiple>
      העלאת קבצים לדרייב
    </UploadButton>
  );
};
