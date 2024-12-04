import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  PhoneIcon, 
  VideoCameraIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

export default function CallModal({ isOpen, onClose, type, chatId }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    {type === 'video' ? (
                      <VideoCameraIcon className="h-12 w-12 text-gray-600" />
                    ) : (
                      <PhoneIcon className="h-12 w-12 text-gray-600" />
                    )}
                  </div>
                  <Dialog.Title className="text-lg font-medium">
                    {type === 'video' ? 'Video Call' : 'Voice Call'}
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 mt-2">
                    {formatDuration(callDuration)}
                  </p>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full ${
                      isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <MicrophoneIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-4 rounded-full ${
                      !isSpeakerOn ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <SpeakerWaveIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-4 rounded-full bg-red-600 text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}