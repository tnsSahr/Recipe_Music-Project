/**
 * SCRIPT.JS — Interactive Recipe Controller ([untitled] Style)
 * 
 * 🎧 AUDIO STREAMING:
 * Uses high-speed direct Apple Music preview streams (with local fallback)
 * so playback works instantly on GitHub Pages, mobile, and desktop without stalling!
 */

// 1. DATA: The 10 curated tracks organized by algorithm recipe steps
const tracksData = [
  {
    step: "01",
    role: "The Opener",
    title: "Banquet / Helicopter",
    artist: "Bloc Party",
    image: "bloc_party.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ae/15/c5/ae15c521-1c5c-dda9-fa84-e4fdd5c94649/mzaf_7441690722223983772.plus.aac.p.m4a",
    localAudio: "bloc_party.m4a",
    vibe: "⚡ Post-Punk Kinetic",
    note: "Recipe Step 01: Establish immediate urgency with high-tempo angular drums. Do not let the listener skip."
  },
  {
    step: "02",
    role: "Disruption",
    title: "Feedback",
    artist: "Kanye West",
    image: "kanye_tlop.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/66/b7/b5/66b7b5d8-9de7-dcdc-5727-2348daae0d23/mzaf_282003458556729454.plus.aac.p.m4a",
    localAudio: "kanye.m4a",
    vibe: "🔊 Sub-Bass Shockwave",
    note: "Recipe Step 02: Introduce harsh synthetic overdrive and glitch textures. Tension must precede release."
  },
  {
    step: "03",
    role: "Industrial Core",
    title: "The Perfect Drug",
    artist: "Nine Inch Nails",
    image: "nin.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/78/72/df/7872df18-9df5-01e5-6fa2-d3343b64bd2b/mzaf_802759673906989669.plus.aac.p.m4a",
    localAudio: "nin.m4a",
    vibe: "⛓️ Industrial Friction",
    note: "Recipe Step 03: Lock into mechanical rhythms and razor-sharp distortion to push the energy to its limit."
  },
  {
    step: "04",
    role: "Overdrive",
    title: "My Own Hands",
    artist: "Death Drive",
    image: "death_drive.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d5/cb/8d/d5cb8d21-6ac4-2696-f071-a922d7b9b67a/mzaf_11292201618407771618.plus.aac.p.m4a",
    localAudio: "death_drive.m4a",
    vibe: "🎸 Fuzz Distortion",
    note: "Recipe Step 04: Saturate the frequencies with heavy pedal overdrive before pivoting into avant-pop."
  },
  {
    step: "05",
    role: "Avant-Glow",
    title: "Gospel For A New Century",
    artist: "Yves Tumor",
    image: "yves_tumor.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ba/42/cf/ba42cff7-8ae5-6d03-21f9-09d4050894df/mzaf_4743110068891964214.plus.aac.p.m4a",
    localAudio: "yves_tumor.m4a",
    vibe: "✨ Experimental Glam",
    note: "Recipe Step 05: Melt the industrial noise using dramatic brass fanfares and theatrical vocal delivery."
  },
  {
    step: "06",
    role: "Detuned Sky",
    title: "Fleshless Hand",
    artist: "ML Buch",
    image: "ml_buch.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/56/c4/49/56c4492a-f583-0c61-966b-6b41abfe89f1/mzaf_7843768212888800685.plus.aac.p.m4a",
    localAudio: "ml_buch.m4a",
    vibe: "🌫️ Ambient Microtonal",
    note: "Recipe Step 06: Suspend time with 7-string detuned electric guitar lines and crystalline digital production."
  },
  {
    step: "07",
    role: "R&B Respite",
    title: "Losing You",
    artist: "Solange (True)",
    image: "solange_true.gif",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1b/0d/36/1b0d363a-9b63-f97b-666f-8df3f2315130/mzaf_3733668300483629036.plus.aac.p.m4a",
    localAudio: "solange.m4a",
    vibe: "🥁 Warm Syncopation",
    note: "Recipe Step 07: Decompress the room with warm soul, snap claps, and breezy 80s synth-funk chords."
  },
  {
    step: "08",
    role: "Silky Bridge",
    title: "Charcoal Baby",
    artist: "Blood Orange",
    image: "blood_orange.jpeg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/e1/7f/4ee17fe6-b996-f46f-0b00-d5361b802cef/mzaf_6942069272625135481.plus.aac.p.m4a",
    localAudio: "blood_orange.m4a",
    vibe: "🎷 Dreamfunk Melodic",
    note: "Recipe Step 08: Provide a harmonic bridge with lush multi-tracked harmonies and smooth bass guitar."
  },
  {
    step: "09",
    role: "Low-End Hum",
    title: "Frequency",
    artist: "Kid Cudi",
    image: "kid_cudi.jpg",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4b/a1/4d/4ba14d97-ab28-ce0c-1c73-103d2a82cc30/mzaf_5455545487172592053.plus.aac.p.m4a",
    localAudio: "kid_cudi.m4a",
    vibe: "🌌 Nocturnal Sub-Bass",
    note: "Recipe Step 09: Lower the pitch and sink into deep humming, tribal 808 thuds, and nocturnal atmosphere."
  },
  {
    step: "10",
    role: "Nocturnal Climax",
    title: "Desperado",
    artist: "Rihanna (Anti)",
    image: "rihanna_anti.png",
    audio: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ac/ce/9e/acce9ec7-5c34-7ea4-bf77-3786b1341133/mzaf_8908283945994785035.plus.aac.p.m4a",
    localAudio: "rihanna.m4a",
    vibe: "🖤 Midnight Grit",
    note: "Recipe Step 10: Deliver the final climax with slow, confident swagger and dusty acoustic loops."
  }
];

// Current State
let currentIndex = 0;
let isPlaying = false;

// 2. The Browser Audio Player Object
const audioPlayer = new Audio();
audioPlayer.volume = 0.9;
audioPlayer.preload = "auto";

// DOM Elements
const trackCards = document.querySelectorAll(".track-card");
const drawerCover = document.getElementById("drawer-cover");
const drawerStepTag = document.getElementById("drawer-step-tag");
const drawerTitle = document.getElementById("drawer-title");
const drawerArtist = document.getElementById("drawer-artist");
const drawerRecipeNote = document.getElementById("drawer-recipe-note");
const drawerVibeTag = document.getElementById("drawer-vibe-tag");
const togglePlayBtn = document.getElementById("btn-toggle-play");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const floatingStepBtn = document.getElementById("floating-step-btn");

/**
 * Updates UI play/pause icons on cards and bottom bar
 */
function updatePlayIcons(playingState) {
  isPlaying = playingState;
  togglePlayBtn.textContent = isPlaying ? "❚❚" : "▶";

  trackCards.forEach((card, idx) => {
    const playPill = card.querySelector(".play-icon");
    if (idx === currentIndex) {
      card.classList.add("active");
      if (playPill) playPill.textContent = isPlaying ? "❚❚" : "▶";
    } else {
      card.classList.remove("active");
      if (playPill) playPill.textContent = "▶";
    }
  });
}

/**
 * Updates UI metadata and plays or pauses the audio stream
 */
function updatePlayer(index, shouldPlay = true) {
  const isDifferentTrack = (currentIndex !== index) || !audioPlayer.src;
  currentIndex = index;
  const track = tracksData[currentIndex];

  // 1. Update Card Highlight & Drawer Info
  if (drawerCover) drawerCover.src = track.image;
  if (drawerStepTag) drawerStepTag.textContent = `Step ${track.step} / ${tracksData.length} • ${track.role}`;
  if (drawerTitle) drawerTitle.textContent = track.title;
  if (drawerArtist) drawerArtist.textContent = track.artist;
  if (drawerRecipeNote) drawerRecipeNote.innerHTML = `<strong>Recipe Step ${track.step}:</strong> ${track.note.replace(/^Recipe Step \d+:\s*/, "")}`;
  if (drawerVibeTag) drawerVibeTag.textContent = track.vibe;

  // 2. Audio Playback Logic
  if (isDifferentTrack) {
    audioPlayer.src = track.audio;
    audioPlayer.load();
  }

  if (shouldPlay) {
    updatePlayIcons(true);
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Direct stream stalled, attempting local audio fallback:", err);
        // Fallback to local audio file if stream blocked
        if (track.localAudio && audioPlayer.src !== track.localAudio) {
          audioPlayer.src = track.localAudio;
          audioPlayer.load();
          audioPlayer.play().catch((e) => {
            console.error("Playback failed:", e);
            updatePlayIcons(false);
          });
        } else {
          updatePlayIcons(false);
        }
      });
    }
  } else {
    audioPlayer.pause();
    updatePlayIcons(false);
  }
}

// Automatically advance to next recipe step when a 30s preview finishes!
audioPlayer.addEventListener("ended", () => {
  const nextIndex = (currentIndex + 1) % tracksData.length;
  updatePlayer(nextIndex, true);
});

// If audio encounters an error on primary source, automatically try local file
audioPlayer.addEventListener("error", () => {
  const track = tracksData[currentIndex];
  if (track && track.localAudio && !audioPlayer.src.endsWith(track.localAudio)) {
    console.log("Switching to local audio fallback for:", track.title);
    audioPlayer.src = track.localAudio;
    audioPlayer.load();
    if (isPlaying) {
      audioPlayer.play().catch(() => updatePlayIcons(false));
    }
  }
});

// Attach Event Listeners to all Track Cards
trackCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (currentIndex === index && isPlaying) {
      updatePlayer(index, false); // Pause if already playing this song
    } else {
      updatePlayer(index, true);  // Play track
    }
  });
});

// Bottom Player Controls
togglePlayBtn.addEventListener("click", () => {
  updatePlayer(currentIndex, !isPlaying);
});

prevBtn.addEventListener("click", () => {
  const newIndex = (currentIndex - 1 + tracksData.length) % tracksData.length;
  updatePlayer(newIndex, true);
});

nextBtn.addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % tracksData.length;
  updatePlayer(newIndex, true);
});

// Floating "+ Play Recipe Sequence" Button
floatingStepBtn.addEventListener("click", () => {
  if (!isPlaying) {
    updatePlayer(currentIndex, true);
  } else {
    const nextStepIndex = (currentIndex + 1) % tracksData.length;
    updatePlayer(nextStepIndex, true);
  }
});
