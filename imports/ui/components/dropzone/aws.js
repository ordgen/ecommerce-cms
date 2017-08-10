import AWS from 'aws-sdk';
import { Meteor } from 'meteor/meteor';

AWS.config.update({
  region: Meteor.settings.public.AWS_REGION,
  credentials: new AWS.Credentials(
    Meteor.settings.public.AWS_ACCESS_KEY_ID,
    Meteor.settings.public.AWS_SECRET_ACCESS_KEY,
    null,
  ),
});

export default function getSignedUrl(filename, filetype) {
  const s3 = new AWS.S3();
  const params = {
    ACL: 'public-read',
    Bucket: Meteor.settings.public.S3_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
