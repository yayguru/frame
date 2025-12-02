import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'

// 1. Initialize Frog
export const app = new Frog({
  title: 'Daily Degen Oracle',
  // standard Farcaster aspect ratio
  imageAspectRatio: '1.91:1', 
})

// 2. The Data
const ORACLE_CARDS = [
  { id: "whale", emoji: "🐋", title: "THE WHALE", interpretation: "A large influx of capital is imminent. Keep your nets ready and watch the mempool.", color: "#FFD700" },
  { id: "rug", emoji: "☠️", title: "THE RUG", interpretation: "Caution advised. Audit your connections and revoke those sketchy approvals.", color: "#FF4444" },
  { id: "wagmi", emoji: "🤝", title: "WAGMI", interpretation: "Collaboration will lead to success today. Your bags are heavy, but your spirit is light.", color: "#00FF99" },
  { id: "gaswar", emoji: "⛽", title: "THE GAS WAR", interpretation: "Expect friction and high costs. Patience is key, or be prepared to pay the priority fee.", color: "#FF8C00" },
  { id: "airdrop", emoji: "🪂", title: "THE AIRDROP", interpretation: "Unexpected value is heading your way. Check your hidden folders.", color: "#60A5FA" },
  { id: "ngmi", emoji: "📉", title: "NGMI", interpretation: "The charts look grim. Touch grass and regroup for another day.", color: "#9CA3AF" },
  { id: "ape", emoji: "🦍", title: "THE APE", interpretation: "Research is for others. You feel the urge to jump in headfirst. Fortune favors the bold?", color: "#9333EA" },
  { id: "diamond_hands", emoji: "💎", title: "DIAMOND HANDS", interpretation: "HODL through the volatility. Your conviction will be tested, but the reward is eternal.", color: "#22D3EE" },
  { id: "paper_hands", emoji: "🧻", title: "PAPER HANDS", interpretation: "Fear dominates your mind today. You might save your capital, but you'll miss the moon.", color: "#E5E7EB" },
  { id: "alpha", emoji: "🧠", title: "THE ALPHA", interpretation: "You see what others miss. A hidden opportunity is right in front of you.", color: "#EC4899" },
  { id: "bridge", emoji: "🌉", title: "THE BRIDGE", interpretation: "A perilous journey between chains. High risk, but necessary to reach your destination.", color: "#3B82F6" },
  { id: "mint", emoji: "✨", title: "THE MINT", interpretation: "Something new is being born. Be ready to click, and may your gas limit be sufficient.", color: "#FCD34D" },
  { id: "fud", emoji: "📢", title: "THE FUD", interpretation: "Ignore the noise. Bad news is a buy signal if your conviction is true.", color: "#B91C1C" },
  { id: "gm", emoji: "☀️", title: "THE GM", interpretation: "Positive vibes only. Community strength is your biggest asset today.", color: "#FDBA74" },
  { id: "dev", emoji: "👨‍💻", title: "THE DEV", interpretation: "Trust the builder, but verify the contract. Something new is being deployed.", color: "#10B981" },
  { id: "laser_eyes", emoji: "👀", title: "LASER EYES", interpretation: "Focus is key. Ignore the distractions, lock in, and look at the long term.", color: "#EF4444" },
  { id: "shitcoin", emoji: "💩", title: "THE SHITCOIN", interpretation: "High risk, questionable utility. Is it a gem or a rug? Only time will tell.", color: "#92400E" },
  { id: "moon", emoji: "🌕", title: "THE MOON", interpretation: "Up only. The trend is your friend and gravity is a myth.", color: "#D1D5DB" }
];

// 3. FRAME 1: The Invitation (Home Route)
app.frame('/', (c) => {
  return c.res({
    image: (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', width: '100%',
        background: 'linear-gradient(to bottom right, #4a0072, #000000)',
        color: 'white', textAlign: 'center', fontFamily: 'monospace'
      }}>
        {/* Decorative Circle */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(147, 51, 234, 0.2)', filter: 'blur(40px)', display: 'flex'
        }} />
        
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✨</div>
        <div style={{ fontSize: '50px', fontWeight: '900', color: '#00FF99', textTransform: 'uppercase', lineHeight: 1.1, display: 'flex' }}>
          THE DAILY<br/>DEGEN ORACLE
        </div>
        <div style={{ fontSize: '24px', marginTop: '20px', color: '#e0e0e0', fontFamily: 'sans-serif', display: 'flex' }}>
          What wisdom do the Chains hold for you today?
        </div>
      </div>
    ),
    intents: [
      <Button action="/draw">Draw My Card</Button>,
    ],
  })
})

// 4. FRAME 2: The Result (Draw Route)
app.frame('/draw', (c) => {
  // Logic: Pick a random card
  const card = ORACLE_CARDS[Math.floor(Math.random() * ORACLE_CARDS.length)];
  
  // Logic: Prepare Share URL (Dynamically gets current host)
  // When deploying, c.req.url will be your Vercel URL
  const baseUrl = new URL(c.req.url).origin; 
  const shareText = encodeURIComponent(`I consulted the Degen Oracle and drew ${card.title} ${card.emoji}!\n\nCheck yours here:`);
  const warpcastUrl = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${baseUrl}`;

  return c.res({
    image: (
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        height: '100%', width: '100%',
        background: '#1a1a1a', color: 'white', padding: '40px'
      }}>
        
        {/* Left: Card Visual */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '200px', height: '260px',
          border: `6px solid ${card.color}`, borderRadius: '20px',
          background: '#2a2a2a', marginRight: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          transform: 'rotate(-2deg)'
        }}>
          <span style={{ fontSize: '90px' }}>{card.emoji}</span>
        </div>

        {/* Right: Text Content */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
          <div style={{ 
            fontSize: '40px', fontWeight: 'bold', marginBottom: '15px', 
            color: card.color, fontFamily: 'monospace', display: 'flex' 
          }}>
            {card.title}
          </div>
          <div style={{ 
            fontSize: '24px', lineHeight: '1.4', 
            background: 'rgba(0,0,0,0.3)', padding: '20px', 
            borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex'
          }}>
            {card.interpretation}
          </div>
        </div>

      </div>
    ),
    intents: [
      <Button.Link href={warpcastUrl}>Share My Fortune</Button.Link>,
      <Button action="/">Try Again</Button>
    ]
  })
})

devtools(app, { serveStatic })
