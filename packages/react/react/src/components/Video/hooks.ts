/** @tossdocs-ignore */
import { RefObject, useEffect } from 'react';

interface EnforcePlayOptions {
  enabled: boolean;
  onFail: () => void;
}

/**
 * @name useEnforcePlay
 */
export function useEnforcePlay(ref: RefObject<HTMLVideoElement>, { enabled, onFail }: EnforcePlayOptions) {
  useEffect(() => {
    if (!enabled || ref.current === null) {
      return;
    }

    const video = ref.current;

    const handleVideoPlay = () => {
      // IE 등 구 브라우저에선 'play' 메소드가 Promise가 아니므로 예외가 발생하니 안전하게 try/catch로 감쌉니다.
      try {
        video.currentTime = 0;
        video.play().catch(error => {
          /*
           * UserAgent나 OS에 의해 동영상을 재생시킬 수 없을 때 'NotAllowedError' 예외가 발생합니다. 이 예외는
           * 브라우저 정책으로 사용자가 "재생" 버튼을 클릭하여 재생시키는 것을 강제할 때 발생할 수 있습니다.
           *
           * iOS에서는 저전력 모드에서 이 에외가 발생하며, 동영상은 재생되지 않고 재생 버튼이 표시됩니다. 여기서는 해당
           * 예외가 발생하면 동영상은 감추고 FallbackImage를 표시합니다.
           *
           * 참조: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play#Exceptions
           */
          if (isNotAllowedError(error)) {
            onFail();
          }
        });
      } catch {
        //
      }
    };

    /*
     * 크로미움에서 아직 로드되지 않았을 때 동영상을 재생하면 object-fit: cover 스타일을 적용한 video poster가 찌그러지는 이슈가 있어
     * video의 metadata를 불러온 뒤 동영상을 재생해줍니다
     *
     * 참조: https://stackoverflow.com/questions/65078287/video-poster-gets-stretched-in-chrome-when-playing-a-non-loaded-video
     */
    if (video.readyState < 1) {
      video.addEventListener('loadedmetadata', handleVideoPlay);
      video.load();
    } else {
      handleVideoPlay();
    }
  }, [ref, enabled, onFail]);
}

function isNotAllowedError(error: unknown): boolean {
  return error != null && (error as any).name === 'NotAllowedError';
}

/**
 * @name useFirstTimePlayedCallback
 */
export function useFirstTimePlayedCallback(ref: RefObject<HTMLVideoElement>, callback: () => void) {
  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const video = ref.current;

    if (!video.paused) {
      callback();
      return;
    }

    const onPlay = () => {
      callback();
      video.removeEventListener('play', onPlay);
    };

    video.addEventListener('play', onPlay);

    return () => {
      video.removeEventListener('play', onPlay);
    };
  }, [ref, callback]);
}
