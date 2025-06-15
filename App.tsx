
import React, { useState, useRef, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import FlowerBackground from './components/FlowerBackground';

interface FunnyImage {
  id: number;
  src: string;
  alt: string;
}

const initialFunnyImagesData: FunnyImage[] = [
  { id: 1, src: 'https://files.catbox.moe/fve4et.jpg', alt: 'Lucu dan Cantik 💞' },
  { id: 2, src: 'https://files.catbox.moe/n4q2sp.jpg', alt: 'Sangat Cantik 💞' },
  { id: 3, src: 'https://files.catbox.moe/uv0wrt.jpg', alt: 'Senyuman Manis 💞' },
  { id: 4, src: 'https://files.catbox.moe/w2dgq0.jpg', alt: 'Sangat Cantik dan Manis 💞' },
  { id: 5, src: 'https://files.catbox.moe/b5f6eo.jpg', alt: 'Kesukaan Maul 💞' },
  { id: 6, src: 'https://files.catbox.moe/vpv1nm.jpg', alt: 'Sangat Lucu 💞' },
  { id: 8, src: 'https://files.catbox.moe/d61okg.jpg', alt: 'Calyaa dan Kakak 💞' },
  { id: 9, src: 'https://files.catbox.moe/oa8jtd.jpg', alt: 'Khusus Untuk Maul 💞' },
  { id: 10, src: 'https://files.catbox.moe/9dcf3i.jpg', alt: 'Sangat Imyutt dan Cantik 💞' },
  { id: 11, src: 'https://files.catbox.moe/zyhi4a.jpg', alt: 'Lucu dan Sangat Cantik 💞' },
  { id: 12, src: 'https://files.catbox.moe/htuv3w.jpg', alt: 'Cantik dan Mempesona 💞' },
  { id: 13, src: 'https://files.catbox.moe/qis9m5.jpg', alt: 'Sangat Cantik dan Iucu 💞'},
];

interface Song {
  name: string;
  url: string; 
}

const availableSongs: Song[] = [
  { name: "Indahnya Calya", url: "https://files.catbox.moe/t65dkj.mpeg" },
  { name: "Harmonis Cinta Maul & Calya", url: "https://files.catbox.moe/b7579u.mpeg" },
  { name: "Monolog", url: "https://files.catbox.moe/whuw9a.mpeg" },
  { name: "Wildflower", url: "https://files.catbox.moe/2jeqz0.mpeg" },
  { name: "Dj Romantik", url: "https://files.catbox.moe/9wjgva.mpeg" },
];

const App: React.FC = () => {
  const [images, setImages] = useState<FunnyImage[]>(initialFunnyImagesData);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openSongModal = () => setIsSongModalOpen(true);
  const closeSongModal = () => setIsSongModalOpen(false);

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    closeSongModal();
  };

  const handleTogglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('playing', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      audioElement.addEventListener('ended', handlePause);

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('playing', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('ended', handlePause);
      };
    }
  }, []);

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      audioRef.current.src = selectedSong.url;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error("Error attempting to play audio:", error);
        setIsPlaying(false);
      });
    } else if (audioRef.current && !selectedSong) {
      audioRef.current.pause();
      if (audioRef.current.src !== '') { 
           audioRef.current.src = '';
      }
      setIsPlaying(false);
    }
  }, [selectedSong]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-pink-50 via-custom-pink-100 to-custom-pink-200 text-gray-800 flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-custom-pink-500 selection:text-white overflow-x-hidden relative z-10">
      <FlowerBackground />
      <header className="my-8 sm:my-10 md:my-12 text-center w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-pacifico text-custom-pink-600 drop-shadow-md">
          <span role="img" aria-label="laughing-emoji" className="mr-2 sm:mr-3">❤️</span>
          Galeri Foto Calyaa
        </h1>
        <p className="mt-3 text-base sm:text-lg text-custom-pink-700">Website ini Dibuat Oleh Maul Developer Bertujuan untuk Menyimpan Poto Lucu Calyaaa❤️</p>
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={openSongModal}
              aria-label="Pilih lagu untuk diputar"
              className="bg-custom-pink-500 hover:bg-custom-pink-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-custom-pink-400 focus:ring-opacity-75"
            >
              Pilih Lagu <span role="img" aria-label="music-note">🎶</span>
            </button>
            {selectedSong && (
              <button
                onClick={handleTogglePlayPause}
                aria-label={isPlaying ? "Jeda lagu" : "Lanjutkan lagu"}
                className={`font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                  isPlaying 
                    ? 'bg-custom-pink-300 hover:bg-custom-pink-400 text-custom-pink-800 focus:ring-custom-pink-200' 
                    : 'bg-custom-pink-500 hover:bg-custom-pink-600 text-white focus:ring-custom-pink-400'
                }`}
              >
                {isPlaying ? (
                  <>Jeda Lagu <span role="img" aria-label="pause-icon">⏸️</span></>
                ) : (
                  <>Lanjutkan <span role="img" aria-label="play-icon">▶️</span></>
                )}
              </button>
            )}
          </div>
          {selectedSong && (
            <div className="mt-3">
              <p className={`text-sm text-custom-pink-700 ${isPlaying ? 'animate-pulse' : ''}`}>
                Sedang Memutar: <span className="font-semibold">{selectedSong.name}</span>
              </p>
            </div>
          )}
        </div>
      </header>

      <audio ref={audioRef} style={{ display: 'none' }} loop/>

      {isSongModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
          onClick={closeSongModal} 
          role="dialog"
          aria-modal="true"
          aria-labelledby="song-modal-title"
        >
          <div 
            className="bg-gradient-to-br from-custom-pink-50 to-custom-pink-100 p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 id="song-modal-title" className="text-2xl font-pacifico text-custom-pink-600 mb-6 text-center">Pilih Lagu</h3>
            <ul className="space-y-3 flex-grow">
              {availableSongs.map((song) => (
                <li key={song.name}>
                  <button
                    onClick={() => handleSongSelect(song)}
                    className="w-full text-left p-4 bg-white hover:bg-custom-pink-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-custom-pink-400 group"
                  >
                    <span className="text-lg text-custom-pink-700 font-medium group-hover:text-custom-pink-600">{song.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={closeSongModal}
              className="mt-8 w-full bg-custom-pink-300 hover:bg-custom-pink-400 text-custom-pink-800 font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-custom-pink-400"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <main className="w-full max-w-7xl px-2 sm:px-4 mt-8">
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-custom-pink-700 text-xl">Galeri Calyaa</p>
        )}
      </main>

      <footer className="mt-8 sm:mt-12 py-6 sm:py-8 text-center text-custom-pink-800 text-sm">
        <p>© {new Date().getFullYear()} Galeri Foto Calyaa 💞</p>
        <p>Di Buat Oleh Maul Developer</p>
      </footer>
    </div>
  );
};

export default App;
