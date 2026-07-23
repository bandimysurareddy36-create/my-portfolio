const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacements = [
    // Head script and style
    [
        `</style>\n</head>`,
        `  [data-lucide] { width: 1.2em; height: 1.2em; stroke-width: 2px; vertical-align: middle; }\n</style>\n<script src="https://unpkg.com/lucide@latest"></script>\n</head>`
    ],
    // Body script
    [
        `</body>\n</html>`,
        `  <script>lucide.createIcons();</script>\n</body>\n</html>`
    ],
    // Navbar
    [ `<a href="tel:+917093943968" class="icon-btn" style="color:var(--green); border-color:var(--green);">📞</a>`, `<a href="tel:+917093943968" class="icon-btn" style="color:var(--green); border-color:var(--green);"><i data-lucide="phone"></i></a>` ],
    [ `⚡ Hire Me`, `<i data-lucide="zap"></i> Hire Me` ],
    // Hero
    [ `<div class="badge"><span class="dot"></span> Open to opportunities</div>`, `<div class="badge"><i data-lucide="check-circle" style="color:var(--green); width:14px; height:14px;"></i> Open to opportunities</div>` ],
    [ `⚡ Oracle Fusion Technical Consultant`, `<i data-lucide="zap" style="width:14px; height:14px;"></i> Oracle Fusion Technical Consultant` ],
    [ `<div class="stat">🎓 <b>2</b> Years</div>`, `<div class="stat"><i data-lucide="graduation-cap"></i> <b>2</b> Years</div>` ],
    [ `<div class="stat">⭐ <b>3+</b> modules</div>`, `<div class="stat"><i data-lucide="star"></i> <b>3+</b> modules</div>` ],
    [ `<div class="stat">⚡ <b>20+</b> Skills</div>`, `<div class="stat"><i data-lucide="zap"></i> <b>20+</b> Skills</div>` ],
    [ `<span style="color:var(--green);">📞`, `<span style="color:var(--green);"><i data-lucide="phone"></i>` ],
    [ `<span>✉️ Email</span>`, `<span><i data-lucide="mail"></i> Email</span>` ],
    [ `<span>📍 Hyderabad</span>`, `<span><i data-lucide="map-pin"></i> Hyderabad</span>` ],
    [ `⚡ Oracle Cloud`, `<i data-lucide="zap"></i> Oracle Cloud` ],
    [ `⭐ BI Publisher`, `<i data-lucide="star"></i> BI Publisher` ],
    // Module grid
    [ `<div class="module-card"><div class="ic">🛒</div>Procurement</div>`, `<div class="module-card"><div class="ic"><i data-lucide="shopping-cart"></i></div>Procurement</div>` ],
    [ `<div class="module-card"><div class="ic">💳</div>Payables</div>`, `<div class="module-card"><div class="ic"><i data-lucide="credit-card"></i></div>Payables</div>` ],
    [ `<div class="module-card"><div class="ic">🧾</div>Receivables</div>`, `<div class="module-card"><div class="ic"><i data-lucide="receipt"></i></div>Receivables</div>` ],
    [ `<div class="module-card"><div class="ic">📖</div>General Ledger</div>`, `<div class="module-card"><div class="ic"><i data-lucide="book-open"></i></div>General Ledger</div>` ],
    [ `<div class="module-card"><div class="ic">🚚</div>Supplier Mgmt</div>`, `<div class="module-card"><div class="ic"><i data-lucide="truck"></i></div>Supplier Mgmt</div>` ],
    [ `<div class="module-card"><div class="ic">👥</div>HCM</div>`, `<div class="module-card"><div class="ic"><i data-lucide="users"></i></div>HCM</div>` ],
    // Projects
    [ `<div class="ic">🗂️</div>`, `<div class="ic"><i data-lucide="folder"></i></div>` ],
    [ `<div class="ic">📄</div>`, `<div class="ic"><i data-lucide="file-text"></i></div>` ],
    [ `<div class="ic">🗄️</div>`, `<div class="ic"><i data-lucide="database"></i></div>` ],
    [ `<div class="ic">👥</div>`, `<div class="ic"><i data-lucide="users"></i></div>` ],
    [ `<div class="ic">⚡</div>`, `<div class="ic"><i data-lucide="zap"></i></div>` ],
    // Education
    [ `<div class="tl-dot" style="background:#3b82f6;">🎓</div>`, `<div class="tl-dot" style="background:#3b82f6;"><i data-lucide="graduation-cap"></i></div>` ],
    [ `<div class="tl-dot" style="background:#22c55e;">📘</div>`, `<div class="tl-dot" style="background:#22c55e;"><i data-lucide="book"></i></div>` ],
    [ `<div class="tl-dot" style="background:#f59e0b;">🎖️</div>`, `<div class="tl-dot" style="background:#f59e0b;"><i data-lucide="award"></i></div>` ],
    // Certifications
    [ `<div class="ic">🏆</div>`, `<div class="ic"><i data-lucide="trophy"></i></div>` ],
    // Blog footer
    [ `<span>📅 \${date}</span>`, `<span><i data-lucide="calendar"></i> \${date}</span>` ],
    // Quickfacts
    [ `<div class="qf-row"><div class="ic">💼</div>`, `<div class="qf-row"><div class="ic"><i data-lucide="briefcase"></i></div>` ],
    [ `<div class="qf-row"><div class="ic">📍</div>`, `<div class="qf-row"><div class="ic"><i data-lucide="map-pin"></i></div>` ],
    [ `<div class="qf-row"><div class="ic">🎓</div>`, `<div class="qf-row"><div class="ic"><i data-lucide="graduation-cap"></i></div>` ],
    [ `<div class="qf-row"><div class="ic">❤️</div>`, `<div class="qf-row"><div class="ic"><i data-lucide="heart"></i></div>` ],
    // Contact
    [ `<div class="ic" style="background:#22c55e;">📞</div>`, `<div class="ic" style="background:#22c55e;"><i data-lucide="phone"></i></div>` ],
    [ `<div class="ic" style="background:#f59e0b;">✉️</div>`, `<div class="ic" style="background:#f59e0b;"><i data-lucide="mail"></i></div>` ],
    [ `<div class="ic" style="background:#22c55e;">📍</div>`, `<div class="ic" style="background:#22c55e;"><i data-lucide="map-pin"></i></div>` ],
    [ `<div class="ic" style="background:#7c3aed;">💬</div>`, `<div class="ic" style="background:#7c3aed;"><i data-lucide="message-circle"></i></div>` ],
    [ `<div class="send-ic">➤</div>`, `<div class="send-ic"><i data-lucide="send"></i></div>` ],
    [ `✉️ Send Email`, `<i data-lucide="mail"></i> Send Email` ],
    [ `📞 Call Now`, `<i data-lucide="phone"></i> Call Now` ],
    [ `<span>❤️ Passionate about Oracle</span>`, `<span><i data-lucide="heart"></i> Passionate about Oracle</span>` ],
    [ `<span>⏱ 24h response time</span>`, `<span><i data-lucide="clock"></i> 24h response time</span>` ],
    // Footer icons
    [ `<span>✉️</span><span>🖼️</span><span>💬</span>`, `<span><i data-lucide="mail"></i></span><span><i data-lucide="image"></i></span><span><i data-lucide="message-circle"></i></span>` ],
    // JS skillIcons
    [ `const skillIcons = ["📊","📄","📈","💾","💻","🗃️","🗂️","📰","⚙️","📋","🔀","🧩"];`, `const skillIcons = ["bar-chart","file-text","trending-up","save","laptop","database","folder","newspaper","settings","clipboard","shuffle","puzzle"];` ],
    [ `<div class="label"><span>\${skillIcons[i]||'▫'} \${name}</span>`, `<div class="label"><span style="display:flex;align-items:center;gap:6px;"><i data-lucide="\${skillIcons[i]||'square'}"></i> \${name}</span>` ],
    // JS expertiseData
    [ `["📄","BI Publisher Reports`, `["file-text","BI Publisher Reports` ],
    [ `["🗄️","Data Migration`, `["database","Data Migration` ],
    [ `["🔧","Technical Issue`, `["wrench","Technical Issue` ],
    [ `["🔗","OIC Integration`, `["link","OIC Integration` ],
    [ `["💻","SQL & PL/SQL`, `["laptop","SQL & PL/SQL` ],
    [ `["🔗","HCM Data`, `["link","HCM Data` ],
    [ `<div class="ic" style="background:\${bg};color:\${fg};">\${ic}</div>`, `<div class="ic" style="background:\${bg};color:\${fg};"><i data-lucide="\${ic}"></i></div>` ]
];

let replaced = content;
for (let [search, replace] of replacements) {
    replaced = replaced.split(search).join(replace); // global replacement
}

fs.writeFileSync('index.html', replaced, 'utf8');
console.log('Replacement complete.');
