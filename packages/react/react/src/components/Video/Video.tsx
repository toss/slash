/** @jsxImportSource react */
import { isServer } from '@toss/utils';
import classnames from 'classnames';
import { memo, RefObject, useMemo, useRef } from 'react';
import { useBooleanState } from '../../hooks';
import Style, { generateClassNames } from '../../utils/Style';
import { useEnforcePlay, useFirstTimePlayedCallback } from './hooks';

type VideoHtmlProps = React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;

interface VideoProps extends VideoHtmlProps {
  videoRef?: RefObject<HTMLVideoElement>;
  className?: string;
  videoClassName?: string;
  src: string;
  /*
   * 플레이스홀드 이미지를 필수로 설정해주어야 합니다. 그렇지 않은 경우 안드로이드에서 동영상
   * 재생 버튼이 표시될 수 있습니다.
   * 보통은 동영상의 첫번째 프레임을 포스터로 추출합니다.
   */
  poster: string;
  /*
   * 영상을 자동재생 시킬 수 없을 때 표시할 이미지 입니다.
   * @default poster
   */
  fallbackPoster?: string;
  fallbackPosterClassName?: string;
  /*
   * 재생 전까지 fallbackImage를 표시할지 여부를 결정합니다. 이 값이 false라면 iOS 저전력 모드에서 재생 버튼이
   * 표시되었다가 사라지는 현상이 발생할 수 있습니다.
   * @default removePlayButtonInIOSPowerSavingMode
   */
  showFallbackPosterUntilPlay?: boolean;
  /*
   * 일부 안드로이드 버전 (Chrome 83, 84) 에서 비디오가 전체화면으로 포함되면
   * 화면 전체가 검정색으로 깜빡이는 현상이 발생하여, 이것을 poster만 보여줌으로써 방지합니다.
   * @default 브라우저에 따라 다름
   */
  enforcePoster?: boolean;
  /*
   * 영상을 강제로 재생시켜 iOS 저전력 모드에서 재생 버튼이 표시되는 것을 방지합니다.
   * @default false
   */
  removePlayButtonInIOSPowerSavingMode?: boolean;
  /** @default video/mp4 */
  sourceType?: string;
}

/**
 * @name Video
 * @description `@toss/video`를 사용해주세요.
 */
const Video: React.FC<VideoProps> = ({
  className,
  src,
  videoClassName,
  controls = false,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  videoRef,
  removePlayButtonInIOSPowerSavingMode = false,
  showFallbackPosterUntilPlay = removePlayButtonInIOSPowerSavingMode,
  poster,
  fallbackPoster = poster,
  fallbackPosterClassName,
  sourceType = 'video/mp4',
  enforcePoster = defaultEnforcePoster,
  ...videoProps
}) => {
  const internalRef = useRef<HTMLVideoElement>(null);
  const ref = useMemo(() => (videoRef ? videoRef : internalRef), [videoRef]);
  const enforcePlaying = removePlayButtonInIOSPowerSavingMode;

  const [fallbackPosterVisible, setFallbackPosterVisible, setFallbackPosterInvisible] = useBooleanState(
    Boolean(showFallbackPosterUntilPlay)
  );

  const enforceConfig = useMemo(
    () => ({
      enabled: enforcePlaying,
      onFail: setFallbackPosterVisible,
    }),
    [enforcePlaying, setFallbackPosterVisible]
  );

  useEnforcePlay(ref, enforceConfig);
  useFirstTimePlayedCallback(ref, setFallbackPosterInvisible);

  const posterVisible = fallbackPosterVisible || enforcePoster;

  return (
    <Style css={css}>
      <div className={classnames(className, CLASSNAMES.wrapper)}>
        <img
          src={fallbackPoster}
          alt=""
          aria-hidden={true}
          className={classnames(fallbackPosterClassName, CLASSNAMES.fallbackPoster, {
            [CLASSNAMES.fallbackPosterHidden]: !posterVisible,
          })}
        />
        <video
          ref={ref}
          controls={controls}
          autoPlay={enforcePlaying ? false : autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          poster={poster}
          {...videoProps}
          className={classnames(videoClassName, CLASSNAMES.video, { [CLASSNAMES.videoHidden]: posterVisible })}
        >
          <source src={src} type={sourceType} />
        </video>
      </div>
    </Style>
  );
};

export default memo(Video);

const defaultEnforcePoster = (() => {
  if (isServer()) {
    return false;
  }

  const isAndroid = navigator.userAgent.includes('Android');
  const [, browser, version] = navigator.userAgent.match(/(Chrome)\/([0-9.]*)/) ?? [undefined, undefined, undefined];

  if (browser == null || version == null) {
    return false;
  }

  const majorVersion = Number(version.split('.')[0]);
  return isAndroid && browser === 'Chrome' && majorVersion >= 83 && majorVersion < 85;
})();

const CLASSNAMES = generateClassNames({
  wrapper: `wrapper`,
  fallbackPoster: 'fallback-poster',
  fallbackPosterHidden: 'fallback-poster__enabled',
  video: 'video',
  videoHidden: 'video__hidden',
});

const css = `
  .${CLASSNAMES.wrapper} {
    position: relative;
    overflow: hidden;
  }
  .${CLASSNAMES.fallbackPoster} {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    width: 100%;
  }
  .${CLASSNAMES.fallbackPosterHidden} {
    z-index: -1;
  }
  .${CLASSNAMES.video} {
    display: block;
    width: 100%;
    height: 100%;
    mask-image: -webkit-radial-gradient(white, black);
    backface-visibility: hidden;
  }
  .${CLASSNAMES.videoHidden} {
    visibility: hidden;
    z-index: -1;
  }
`;
