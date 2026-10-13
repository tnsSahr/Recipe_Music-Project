/**
 * SCRIPT.JS — Interactive Recipe Controller ([untitled] Style)
 * 
 * ✏️ FOR CLASSMATES & STUDENTS:
 * All 10 tracks now include real 30-second music previews saved in the audio/ folder!
 */

// 1. DATA: The 10 curated tracks organized by algorithm recipe steps
const tracksData = [
  {
    step: "01",
    role: "The Opener",
    title: "Banquet / Helicopter",
    artist: "Bloc Party",
    image: "images/bloc_party.jpg",
    audio: "audio/bloc_party.m4a",
    vibe: "⚡ Post-Punk Kinetic",
    note: "Recipe Step 01: Establish immediate urgency with high-tempo angular drums. Do not let the listener skip."
  },
  {
    step: "02",
    role: "Disruption",
    title: "Feedback",
    artist: "Kanye West",
    image: "images/kanye_tlop.jpg",
    audio: "audio/kanye.m4a",
    vibe: "🔊 Sub-Bass Shockwave",
    note: "Recipe Step 02: Introduce harsh synthetic overdrive and glitch textures. Tension must precede release."
  },
  {
    step: "03",
    role: "Industrial Core",
    title: "The Perfect Drug",
    artist: "Nine Inch Nails",
    image: "images/nin.jpg",
    audio: "audio/nin.m4a",
    vibe: "⛓️ Industrial Friction",
    note: "Recipe Step 03: Lock into mechanical rhythms and razor-sharp distortion to push the energy to its limit."
  },
  {
    step: "04",
    role: "Overdrive",
    title: "My Own Hands",
    artist: "Death Drive",
    image: "images/death_drive.jpg",
    audio: "audio/death_drive.m4a",
    vibe: "🎸 Fuzz Distortion",
    note: "Recipe Step 04: Saturate the frequencies with heavy pedal overdrive before pivoting into avant-pop."
  },
  {
    step: "05",
    role: "Avant-Glow",
    title: "Gospel For A New Century",
    artist: "Yves Tumor",
    image: "images/yves_tumor.jpg",
    audio: "audio/yves_tumor.m4a",
    vibe: "✨ Experimental Glam",
    note: "Recipe Step 05: Melt the industrial noise using dramatic brass fanfares and theatrical vocal delivery."
  },
  {
    step: "06",
    role: "Detuned Sky",
    title: "Fleshless Hand",
    artist: "ML Buch",
    image: "images/ml_buch.jpg",
    audio: "audio/ml_buch.m4a",
    vibe: "🌫️ Ambient Microtonal",
    note: "Recipe Step 06: Suspend time with 7-string detuned electric guitar lines and crystalline digital production."
  },
  {
    step: "07",
    role: "R&B Respite",
    title: "Losing You",
    artist: "Solange (True)",
    image: "images/solange_true.gif",
    audio: "audio/solange.m4a",
    vibe: "🥁 Warm Syncopation",
    note: "Recipe Step 07: Decompress the room with warm soul, snap claps, and breezy 80s synth-funk chords."
  },
  {
    step: "08",
    role: "Silky Bridge",
    title: "Charcoal Baby",
    artist: "Blood Orange",
    image: "images/blood_orange.jpg",
    audio: "audio/blood_orange.m4a",
    vibe: "🎷 Dreamfunk Melodic",
    note: "Recipe Step 08: Provide a harmonic bridge with lush multi-tracked harmonies and smooth bass guitar."
  },
  {
    step: "09",
    role: "Low-End Hum",
    title: "Frequency",
    artist: "Kid Cudi",
    image: "images/kid_cudi.jpg",
    audio: "audio/kid_cudi.m4a",
    vibe: "🌌 Nocturnal Sub-Bass",
    note: "Recipe Step 09: Lower the pitch and sink into deep humming, tribal 808 thuds, and nocturnal atmosphere."
  },
  {
    step: "10",
    role: "Nocturnal Climax",
    title: "Desperado",
    artist: "Rihanna (Anti)",
    image: "images/rihanna_anti.png",
    audio: "audio/rihanna.m4a",
    vibe: "🖤 Midnight Grit",
    note: "Recipe Step 10: Deliver the final climax with slow, confident swagger and dusty acoustic loops."
  }
];

// Current State
let currentIndex = 0;
let isPlaying = false;

// 2. The Browser Audio Player Object
const audioPlayer = new Audio();
audioPlayer.volume = 0.85;

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
 * Updates UI and plays or pauses the real audio file
 */
function updatePlayer(index, shouldPlay = true) {
  const isDifferentTrack = (currentIndex !== index) || !audioPlayer.src;
  currentIndex = index;
  const track = tracksData[currentIndex];

  // 1. Update Card Highlighting
  trackCards.forEach((card, idx) => {
    const playPill = card.querySelector(".play-icon");
    if (idx === currentIndex) {
      card.classList.add("active");
      if (playPill) playPill.textContent = shouldPlay ? "❚❚" : "▶";
    } else {
      card.classList.remove("active");
      if (playPill) playPill.textContent = "▶";
    }
  });

  // 2. Update Bottom Drawer Info
  drawerCover.src = track.image;
  drawerStepTag.textContent = `Step ${track.step} / ${tracksData.length} • ${track.role}`;
  drawerTitle.textContent = track.title;
  drawerArtist.textContent = track.artist;
  drawerRecipeNote.innerHTML = `<strong>Recipe Step ${track.step}:</strong> ${track.note.replace(/^Recipe Step \d+:\s*/, "")}`;
  drawerVibeTag.textContent = track.vibe;

  // 3. Audio Playback Logic
  if (isDifferentTrack) {
    audioPlayer.src = track.audio;
  }

  if (shouldPlay) {
    isPlaying = true;
    togglePlayBtn.textContent = "❚❚";
    audioPlayer.play().catch((err) => {
      console.warn("Audio autoplay policy: waiting for user click.", err);
    });
  } else {
    isPlaying = false;
    togglePlayBtn.textContent = "▶";
    audioPlayer.pause();
  }
}

// Automatically advance to the next recipe step when a 30s preview finishes!
audioPlayer.addEventListener("ended", () => {
  const nextIndex = (currentIndex + 1) % tracksData.length;
  updatePlayer(nextIndex, true);
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
