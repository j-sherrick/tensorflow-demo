import { browser, data } from "@tensorflow/tfjs";

namespace util {

   namespace browserProfile {
      export function isiOS() {
         return regex.IOS.test(navigator.userAgent);
      }
      
      export function isAndroid() {
         return regex.ANDROID.test(navigator.userAgent);
      }
      
      export function isMobile() {
         return isAndroid() || isiOS();
      }

      export function hasUserMedia() {
         return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      }
   
      export function hasVideoFrameCallback() {
         return !!(HTMLVideoElement.prototype.requestVideoFrameCallback);
      }
   }
   
   namespace video {
      export function isPortrait() {
         return window.innerHeight > window.innerWidth;
      }
   
      export function isLandscape() {
         return window.innerWidth > window.innerHeight;
      }
   }

   namespace regex {
      export const IOS = /iPhone|iPad|iPod/i;
      export const ANDROID = /Android/i;
   }
}
