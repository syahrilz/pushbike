const API_URL = 'http://localhost:3001/api';
let authToken = localStorage.getItem('authToken');

// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showContent(contentId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(contentId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${contentId.replace('-content', '')}"]`).classList.add('active');
}

// API Helpers
async function apiCall(endpoint, method = 'GET', body = null, isFormData = false) {
    const headers = {};
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    if (!isFormData && body) {
        headers['Content-Type'] = 'application/json';
    }
    
    const options = {
        method,
        headers
    };
    
    if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
    }
    
    return response.json();
}

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const result = await apiCall('/auth/login', 'POST', { username, password });
        authToken = result.token;
        localStorage.setItem('authToken', authToken);
        showPage('dashboard-page');
        loadDashboardStats();
        document.getElementById('login-error').textContent = '';
    } catch (error) {
        document.getElementById('login-error').textContent = error.message;
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        await apiCall('/auth/logout', 'POST');
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    authToken = null;
    localStorage.removeItem('authToken');
    showPage('login-page');
});

// Dashboard
async function loadDashboardStats() {
    try {
        const stats = await apiCall('/stats');
        document.getElementById('stat-participants').textContent = stats.participants;
        document.getElementById('stat-schedules').textContent = stats.schedules;
        document.getElementById('stat-results').textContent = stats.results;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        showContent(`${page}-content`);
        
        // Load data for the page
        switch(page) {
            case 'dashboard':
                loadDashboardStats();
                break;
            case 'participants':
                loadParticipants();
                break;
            case 'race-draw':
                loadRaceDraw();
                break;
            case 'schedule':
                loadSchedule();
                break;
            case 'live-monitor':
                loadLiveMonitor();
                break;
            case 'results':
                loadResults();
                break;
            case 'next-stage':
                loadNextStage();
                break;
            case 'admins':
                loadAdmins();
                break;
            case 'spectator':
                loadSpectatorView();
                break;
        }
    });
});

// Participants
async function loadParticipants() {
    try {
        const participants = await apiCall('/participants');
        const tbody = document.querySelector('#participants-table tbody');
        tbody.innerHTML = '';
        
        participants.forEach(p => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.dob}</td>
                <td>${p.category}</td>
                <td>${p.parent_name}</td>
                <td>${p.contact}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteParticipant(${p.id})">Hapus</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error loading participants:', error);
    }
}

document.getElementById('add-participant-btn').addEventListener('click', () => {
    document.getElementById('add-participant-form').style.display = 'block';
});

document.getElementById('cancel-participant-btn').addEventListener('click', () => {
    document.getElementById('add-participant-form').style.display = 'none';
    document.getElementById('participant-form').reset();
});

document.getElementById('participant-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        await apiCall('/participants', 'POST', formData, true);
        alert('Peserta berhasil ditambahkan!');
        document.getElementById('add-participant-form').style.display = 'none';
        e.target.reset();
        loadParticipants();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

async function deleteParticipant(id) {
    if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
        try {
            await apiCall(`/participants/${id}`, 'DELETE');
            alert('Peserta berhasil dihapus!');
            loadParticipants();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Race Draw
async function loadRaceDraw() {
    try {
        const draws = await apiCall('/race-draw');
        const tbody = document.querySelector('#race-draw-table tbody');
        tbody.innerHTML = '';
        
        draws.forEach(d => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${d.group_name}</td>
                <td>${d.draw_order}</td>
                <td>${d.name}</td>
                <td>${d.category}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading race draw:', error);
    }
}

document.getElementById('auto-draw-btn').addEventListener('click', async () => {
    try {
        const participants = await apiCall('/participants');
        
        if (participants.length === 0) {
            alert('Tidak ada peserta untuk diundi!');
            return;
        }
        
        // Group by category
        const categories = {};
        participants.forEach(p => {
            if (!categories[p.category]) {
                categories[p.category] = [];
            }
            categories[p.category].push(p);
        });
        
        // Shuffle and assign draw order
        for (const category in categories) {
            const participants = categories[category];
            // Shuffle array
            for (let i = participants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [participants[i], participants[j]] = [participants[j], participants[i]];
            }
            
            // Assign to groups (4 participants per group)
            const groupSize = 4;
            for (let i = 0; i < participants.length; i++) {
                const groupNumber = Math.floor(i / groupSize) + 1;
                const drawOrder = (i % groupSize) + 1;
                
                await apiCall('/race-draw', 'POST', {
                    participant_id: participants[i].id,
                    group_name: `${category}-Group${groupNumber}`,
                    draw_order: drawOrder
                });
            }
        }
        
        alert('Pengundian berhasil!');
        loadRaceDraw();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Schedule
async function loadSchedule() {
    try {
        const schedules = await apiCall('/race-schedule');
        const tbody = document.querySelector('#schedule-table tbody');
        tbody.innerHTML = '';
        
        schedules.forEach(s => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${s.group_name}</td>
                <td>${s.category}</td>
                <td>${new Date(s.start_time).toLocaleString('id-ID')}</td>
                <td>${s.end_time ? new Date(s.end_time).toLocaleString('id-ID') : '-'}</td>
                <td>${s.track_number || '-'}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading schedule:', error);
    }
}

document.getElementById('add-schedule-btn').addEventListener('click', () => {
    document.getElementById('add-schedule-form').style.display = 'block';
});

document.getElementById('cancel-schedule-btn').addEventListener('click', () => {
    document.getElementById('add-schedule-form').style.display = 'none';
    document.getElementById('schedule-form').reset();
});

document.getElementById('schedule-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        await apiCall('/race-schedule', 'POST', data);
        alert('Jadwal berhasil ditambahkan!');
        document.getElementById('add-schedule-form').style.display = 'none';
        e.target.reset();
        loadSchedule();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Live Monitor
async function loadLiveMonitor() {
    try {
        const liveData = await apiCall('/live-monitor');
        const tbody = document.querySelector('#live-monitor-table tbody');
        tbody.innerHTML = '';
        
        liveData.forEach(d => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${d.position}</td>
                <td>${d.name}</td>
                <td>${d.category}</td>
                <td>${d.lap_time}</td>
                <td>${new Date(d.timestamp).toLocaleString('id-ID')}</td>
            `;
        });
        
        // Load participants for dropdown
        const participants = await apiCall('/participants');
        const select = document.getElementById('live-participant-select');
        select.innerHTML = '<option value="">Pilih Peserta</option>';
        participants.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} (${p.category})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading live monitor:', error);
    }
}

document.getElementById('add-live-data-btn').addEventListener('click', () => {
    document.getElementById('add-live-form').style.display = 'block';
});

document.getElementById('cancel-live-btn').addEventListener('click', () => {
    document.getElementById('add-live-form').style.display = 'none';
    document.getElementById('live-form').reset();
});

document.getElementById('live-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        await apiCall('/live-monitor', 'POST', data);
        alert('Data live berhasil ditambahkan!');
        document.getElementById('add-live-form').style.display = 'none';
        e.target.reset();
        loadLiveMonitor();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

document.getElementById('refresh-live-btn').addEventListener('click', loadLiveMonitor);

// Results
async function loadResults(category = '') {
    try {
        const url = category ? `/race-results?category=${category}` : '/race-results';
        const results = await apiCall(url);
        const tbody = document.querySelector('#results-table tbody');
        tbody.innerHTML = '';
        
        results.forEach(r => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${r.rank}</td>
                <td>${r.name}</td>
                <td>${r.category}</td>
                <td>${r.finish_time}</td>
            `;
        });
        
        // Load participants for dropdown
        const participants = await apiCall('/participants');
        const select = document.getElementById('result-participant-select');
        select.innerHTML = '<option value="">Pilih Peserta</option>';
        participants.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} (${p.category})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

document.getElementById('results-filter').addEventListener('change', (e) => {
    loadResults(e.target.value);
});

document.getElementById('add-result-btn').addEventListener('click', () => {
    document.getElementById('add-result-form').style.display = 'block';
});

document.getElementById('cancel-result-btn').addEventListener('click', () => {
    document.getElementById('add-result-form').style.display = 'none';
    document.getElementById('result-form').reset();
});

document.getElementById('result-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        await apiCall('/race-results', 'POST', data);
        alert('Hasil lomba berhasil ditambahkan!');
        document.getElementById('add-result-form').style.display = 'none';
        e.target.reset();
        loadResults();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Next Stage
async function loadNextStage() {
    try {
        const nextStage = await apiCall('/next-stage');
        const tbody = document.querySelector('#next-stage-table tbody');
        tbody.innerHTML = '';
        
        nextStage.forEach(n => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${n.name}</td>
                <td>${n.category}</td>
                <td>${n.stage}</td>
                <td>${n.status}</td>
            `;
        });
        
        // Load participants for dropdown
        const participants = await apiCall('/participants');
        const select = document.getElementById('next-stage-participant-select');
        select.innerHTML = '<option value="">Pilih Peserta</option>';
        participants.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;
            option.textContent = `${p.name} (${p.category})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading next stage:', error);
    }
}

document.getElementById('add-next-stage-btn').addEventListener('click', () => {
    document.getElementById('add-next-stage-form').style.display = 'block';
});

document.getElementById('cancel-next-stage-btn').addEventListener('click', () => {
    document.getElementById('add-next-stage-form').style.display = 'none';
    document.getElementById('next-stage-form').reset();
});

document.getElementById('next-stage-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        await apiCall('/next-stage', 'POST', data);
        alert('Peserta berhasil ditambahkan ke tahap berikutnya!');
        document.getElementById('add-next-stage-form').style.display = 'none';
        e.target.reset();
        loadNextStage();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Admins
async function loadAdmins() {
    try {
        const admins = await apiCall('/admins');
        const tbody = document.querySelector('#admins-table tbody');
        tbody.innerHTML = '';
        
        admins.forEach(a => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${a.id}</td>
                <td>${a.username}</td>
                <td>${new Date(a.created_at).toLocaleString('id-ID')}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading admins:', error);
    }
}

document.getElementById('add-admin-btn').addEventListener('click', () => {
    document.getElementById('add-admin-form').style.display = 'block';
});

document.getElementById('cancel-admin-btn').addEventListener('click', () => {
    document.getElementById('add-admin-form').style.display = 'none';
    document.getElementById('admin-form').reset();
});

document.getElementById('admin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        await apiCall('/admins', 'POST', data);
        alert('Admin berhasil ditambahkan!');
        document.getElementById('add-admin-form').style.display = 'none';
        e.target.reset();
        loadAdmins();
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Spectator View
async function loadSpectatorView() {
    try {
        // Load results
        const results = await apiCall('/race-results');
        const resultsTbody = document.querySelector('#spectator-results-table tbody');
        resultsTbody.innerHTML = '';
        
        results.slice(0, 10).forEach(r => {
            const row = resultsTbody.insertRow();
            row.innerHTML = `
                <td>${r.rank}</td>
                <td>${r.name}</td>
                <td>${r.category}</td>
                <td>${r.finish_time}</td>
            `;
        });
        
        // Load schedule
        const schedules = await apiCall('/race-schedule');
        const scheduleTbody = document.querySelector('#spectator-schedule-table tbody');
        scheduleTbody.innerHTML = '';
        
        schedules.forEach(s => {
            const row = scheduleTbody.insertRow();
            row.innerHTML = `
                <td>${s.group_name}</td>
                <td>${s.category}</td>
                <td>${new Date(s.start_time).toLocaleString('id-ID')}</td>
            `;
        });
    } catch (error) {
        console.error('Error loading spectator view:', error);
    }
}

document.getElementById('refresh-spectator-btn').addEventListener('click', loadSpectatorView);

// Check if already logged in
if (authToken) {
    showPage('dashboard-page');
    loadDashboardStats();
}
