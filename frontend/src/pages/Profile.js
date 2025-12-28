import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, updateAvatar, logout } = useAuth();

  const [form, setForm] = React.useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      zipCode: user?.address?.zipCode || '',
    },
  });

  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  React.useEffect(() => {
    setForm({
      name: user?.name || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        zipCode: user?.address?.zipCode || '',
      },
    });
  }, [user]);

  const initials = (user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const avatarUrl = user?.avatar || (user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff&size=128`
    : null);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddressField = (key, value) => {
    setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const res = await updateProfile({
        name: form.name,
        phone: form.phone,
        address: form.address,
      });

      if (res?.success) {
        setSuccess('Profile updated successfully');
      } else {
        setError(res?.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '28px 16px',
        background:
          'radial-gradient(1200px 600px at 10% 10%, rgba(6, 182, 212, 0.18), transparent 60%), radial-gradient(900px 450px at 90% 20%, rgba(37, 99, 235, 0.18), transparent 55%), radial-gradient(900px 450px at 30% 90%, rgba(168, 85, 247, 0.14), transparent 55%), linear-gradient(135deg, #f8fafc, #eef2ff)',
      }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a' }}>Profile</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Manage your account information</div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                borderRadius: 12,
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 800,
                border: '1px solid rgba(148, 163, 184, 0.5)',
                background: 'rgba(255,255,255,0.85)',
                cursor: 'pointer',
              }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={onLogout}
              style={{
                borderRadius: 12,
                padding: '10px 14px',
                fontSize: 14,
                fontWeight: 800,
                border: '1px solid rgba(239, 68, 68, 0.35)',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.92), rgba(244, 63, 94, 0.92))',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(239, 68, 68, 0.18)',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 16,
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(148, 163, 184, 0.35)',
              borderRadius: 16,
              boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
              padding: 16,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.name}
                  style={{ width: 64, height: 64, borderRadius: 18, objectFit: 'cover', border: '1px solid rgba(2,6,23,0.08)' }}
                />
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 900,
                    color: '#0f172a',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(37,99,235,0.35))',
                    border: '1px solid rgba(2, 6, 23, 0.06)',
                  }}
                >
                  {initials}
                </div>
              )}

              <div>
                <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 16 }}>{user?.name || 'User'}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{user?.email || ''}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Role: {user?.role || 'customer'}</div>
              </div>
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 800,
                  padding: '10px 14px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                  boxShadow: '0 12px 30px rgba(37, 99, 235, 0.25)',
                  cursor: 'pointer',
                }}
              >
                Upload Avatar
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await updateAvatar(file);
                      e.target.value = '';
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <form
            onSubmit={onSave}
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(148, 163, 184, 0.35)',
              borderRadius: 16,
              boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 16, marginBottom: 10 }}>Account Details</div>

            {error ? (
              <div style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)', color: '#b91c1c', padding: 10, borderRadius: 12, marginBottom: 10, fontSize: 13 }}>
                {error}
              </div>
            ) : null}

            {success ? (
              <div style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)', color: '#047857', padding: 10, borderRadius: 12, marginBottom: 10, fontSize: 13 }}>
                {success}
              </div>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Full Name</div>
                <input
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your name"
                  style={{ width: '100%', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(148, 163, 184, 0.45)', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Phone</div>
                <input
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Your phone"
                  style={{ width: '100%', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(148, 163, 184, 0.45)', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Street</div>
                <input
                  value={form.address.street}
                  onChange={(e) => updateAddressField('street', e.target.value)}
                  placeholder="Street address"
                  style={{ width: '100%', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(148, 163, 184, 0.45)', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>City</div>
                <input
                  value={form.address.city}
                  onChange={(e) => updateAddressField('city', e.target.value)}
                  placeholder="City"
                  style={{ width: '100%', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(148, 163, 184, 0.45)', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Zip Code</div>
                <input
                  value={form.address.zipCode}
                  onChange={(e) => updateAddressField('zipCode', e.target.value)}
                  placeholder="Zip code"
                  style={{ width: '100%', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(148, 163, 184, 0.45)', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  borderRadius: 12,
                  padding: '10px 14px',
                  fontSize: 14,
                  fontWeight: 900,
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  background: saving
                    ? 'linear-gradient(135deg, rgba(148,163,184,0.8), rgba(100,116,139,0.8))'
                    : 'linear-gradient(135deg, #2563eb, #06b6d4)',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  boxShadow: saving ? 'none' : '0 12px 30px rgba(37, 99, 235, 0.25)',
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
