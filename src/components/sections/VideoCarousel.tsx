import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const videos = [
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322078/Rizwan_sir_Reel_07_j4chu9.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322071/Sapna_mam_reel_05_ym92jr.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322075/Sneha_Mam_Reel_03_chyfiu.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322071/Saqlain_sir_reel_14_kzfkd8.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322071/Abhijit_sir_reel_01_ib3iyc.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322066/Harsh_Singh_reel_02_wo03dp.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322066/Mohammed_sir_reel_08_dwev8l.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322062/Purn_pragya_reel_02_q5gcw3.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322055/Sunny_Khurana_reel_03_izkn5a.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322053/Mudit_sir_reel_06_iye621.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322050/Dr_Sunita_Wadhwani_reel_01_icdxsl.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322049/Anamika_ma_am_reel_01_zalolm.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322049/Saqlain_Reel_11_ugwlf3.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322048/Ayurnnath_AD_5_cbk9xp.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322046/Kanade_baburao_szlnvn.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322042/Deepti_ma_am_reel_04_ppchav.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322042/Hitesh_reel_01_qn9gv5.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322039/Priyanka_ma_am_reel_04_glufw2.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322034/Rizwan_sir_reel_06_q7icmv.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322031/Anamika_ma_am_reel_03_sstq5h.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322030/Pallavi_ma_am_reel_12_gii8uc.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773322027/Krushang_sir_reel_06_o7nqli.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773321983/shapna_mam_09_qsmag6.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773321967/Deepti_ma_am_reel_19_uefkft.mp4",
  "https://res.cloudinary.com/dbmsm2kb3/video/upload/v1773321967/Dr_Sachin_Kelenka_wnig5t.mp4",
];

export default function VideoCarousel() {
  const duplicated = [...videos, ...videos, ...videos]; // Triple for seamless infinite loop
  const speed = "45s";

  return (
    <div className="mt-24 pt-16 border-t border-white/10">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">— Video Gallery</span>
          <h3 className="font-heading text-3xl md:text-4xl font-light mt-3">
            Featured Videos
          </h3>
        </div>
      </ScrollReveal>

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <div
        className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ "--duration": speed } as React.CSSProperties}
      >
        {duplicated.map((src, index) => (
          <motion.div
            key={`row1-${index}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-80 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-surface-secondary border border-white/5"
          >
            <video
              src={src}
              className="w-full h-[450px] object-cover"
              controls
              playsInline
              muted
            />
          </motion.div>
        ))}
      </div>

      {/* Row 2 - Right to Left */}
      <div
        className="flex gap-8 w-max mt-12 animate-marquee-reverse hover:[animation-play-state:paused]"
        style={{ "--duration": speed } as React.CSSProperties}
      >
        {duplicated.map((src, index) => (
          <motion.div
            key={`row2-${index}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-80 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-surface-secondary border border-white/5"
          >
            <video
              src={src}
              className="w-full h-[450px] object-cover"
              controls
              playsInline
              muted
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
