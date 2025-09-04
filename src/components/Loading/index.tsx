import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="w-60 h-60">
        <DotLottieReact
          src="https://lottie.host/542ef5dc-3022-46b2-97c5-10dfe8d999df/F4aUMxjGWc.json"
          loop
          autoplay
        />
      </div>
    </div>
  )
}

export default Loading