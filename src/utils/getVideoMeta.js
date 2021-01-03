// https://stackoverflow.com/questions/29285056/get-video-duration-when-input-a-video-file
// const video = await getVideoDuration(fileURL);
// console.log(video.duration)
const getVideoMeta = (fileURL) =>
    new Promise((resolve, reject) => {
        try {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                // console.log(video);
                resolve({ duration: video.duration, height: video.videoHeight, width: video.videoWidth });
            };
            video.onerror = () => {
                reject(new Error('Invalid video. Please select a video file.'));
            };
            video.src = fileURL;
        } catch (e) {
            reject(e);
        }
    });
export default getVideoMeta;

// function validateFile(fileURL, ) {
//     const video = document.createElement('video');
//     video.preload = 'metadata';
//     video.onloadedmetadata = function () {
//         if (video.duration < 1) {
//             console.log('Invalid Video! video is less than 1 second');
//             return;
//         }
//         methodToCallIfValid();
//     };
//     video.src = fileURL;
// }
