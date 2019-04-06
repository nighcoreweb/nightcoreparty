// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */

const fs = require('fs');
const readline = require('readline');
var streamifier = require('streamifier');


// very basic example of uploading a video to youtube
async function uploadToYoutube(youtube,fileBuffer) {
  const res = await youtube.videos.insert(
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: 'Node.js YouTube Upload Test',
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'public',
        },
      },
      media: {
        body: streamifier.createReadStream(fileBuffer),
      },
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        // const progress = (evt.bytesRead / fileSize) * 100;
        // readline.clearLine();
        // readline.cursorTo(0);
        // process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  ).catch((err)=>console.log('err:',err));
  console.log('\n\n');
  console.log(res.data);
  return res.data;
}

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

if (module === require.main) {
  const fileName = process.argv[2];
  sampleClient
    .authenticate(scopes)
    .then(() => runSample(fileName))
    .catch(console.error);
}

module.exports = {
  uploadToYoutube,
};
