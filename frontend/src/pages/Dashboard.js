import React from 'react';
import { useAuth } from '../contexts/AuthContext';

/* ---------- Card Component ---------- */
const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        border: '1px solid rgba(148, 163, 184, 0.35)',
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
        padding: 16,
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        cursor: onClick ? 'pointer' : 'default',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 16px 45px rgba(2, 6, 23, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(2, 6, 23, 0.08)';
      }}
    >
      {children}
    </div>
  );
};

/* ---------- Button Component ---------- */
const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 700,
        padding: '10px 14px',
        border: '1px solid rgba(255,255,255,0.25)',
        color: '#fff',
        background: disabled
          ? 'linear-gradient(135deg, rgba(148,163,184,0.8), rgba(100,116,139,0.8))'
          : 'linear-gradient(135deg, #2563eb, #06b6d4)',
        boxShadow: disabled ? 'none' : '0 12px 30px rgba(37, 99, 235, 0.25)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 150ms ease, box-shadow 150ms ease, filter 150ms ease',
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.filter = 'saturate(1.1)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(37, 99, 235, 0.30)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.filter = 'none';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.25)';
      }}
    >
      {children}
    </button>
  );
};

/* ---------- Icon Components ---------- */
const UsersIcon = () => <span style={{ fontSize: '24px' }}>👥</span>;
const ChartIcon = () => <span style={{ fontSize: '24px' }}>📊</span>;
const MoneyIcon = () => <span style={{ fontSize: '24px' }}>💰</span>;

/* ---------- Dashboard ---------- */
const Dashboard = () => {
  const { user, logout } = useAuth();

  const [transactions, setTransactions] = React.useState([]);
  const [loadingTx, setLoadingTx] = React.useState(true);
  const [txError, setTxError] = React.useState('');

  const loadOrders = React.useCallback(async () => {
    try {
      setTxError('');
      setLoadingTx(true);
      if (!user) {
        setTransactions([]);
        return;
      }

      const ordersService = await import('../services/ordersService');
      const res = await ordersService.getOrders();
      if (res?.success) {
        setTransactions(res.orders || []);
      } else {
        setTxError(res?.error || 'Failed to load transactions');
        setTransactions([]);
      }
    } catch (e) {
      setTxError(e?.error || e?.message || 'Failed to load transactions');
      setTransactions([]);
    } finally {
      setLoadingTx(false);
    }
  }, [user]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (mounted) await loadOrders();
      } catch (e) {
        if (mounted) {
          setTxError(e?.error || e?.message || 'Failed to load transactions');
          setTransactions([]);
        }
      } finally {
        if (mounted) setLoadingTx(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [loadOrders, user]);

  const handleClearHistory = async () => {
    if (!user) return;
    const ok = window.confirm('Delete your order history? This cannot be undone.');
    if (!ok) return;

    try {
      setTxError('');
      const ordersService = await import('../services/ordersService');
      await ordersService.deleteOrders();
      await loadOrders();
    } catch (e) {
      setTxError(e?.error || e?.message || 'Failed to delete order history');
    }
  };

  const initials = (user?.name || 'U')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const statusStyles = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'offline') return { bg: 'rgba(245, 158, 11, 0.14)', fg: '#b45309', bd: 'rgba(245, 158, 11, 0.35)' };
    if (s === 'placed' || s === 'completed') return { bg: 'rgba(16, 185, 129, 0.14)', fg: '#047857', bd: 'rgba(16, 185, 129, 0.35)' };
    if (s === 'pending' || s === 'processing') return { bg: 'rgba(59, 130, 246, 0.14)', fg: '#1d4ed8', bd: 'rgba(59, 130, 246, 0.35)' };
    return { bg: 'rgba(148, 163, 184, 0.16)', fg: '#475569', bd: 'rgba(148, 163, 184, 0.35)' };
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '28px 16px',
        background:
          'radial-gradient(1200px 600px at 10% 10%, rgba(6, 182, 212, 0.25), transparent 60%), radial-gradient(900px 450px at 90% 20%, rgba(37, 99, 235, 0.25), transparent 55%), radial-gradient(900px 450px at 30% 90%, rgba(168, 85, 247, 0.18), transparent 55%), linear-gradient(135deg, #f8fafc, #eef2ff)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 18,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
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
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
                Dashboard
              </div>
              <div style={{ color: '#475569', fontSize: 13 }}>
                Welcome back{user?.name ? `, ${user.name}` : ''}{user?.email ? ` • ${user.email}` : ''}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button
              onClick={handleClearHistory}
              disabled={loadingTx || !transactions.length}
              className="clear-history-btn"
            >
              Clear History
            </Button>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0, color: '#0f172a' }}>Your Transactions</h2>
            <div style={{ fontSize: 12, color: '#64748b' }}>Showing your saved orders</div>
          </div>
        {loadingTx ? (
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 900, color: '#0f172a' }}>Loading...</div>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Fetching your orders from server</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 26, lineHeight: 1 }}>⏳</div>
            </div>
          </Card>
        ) : txError ? (
          <Card>
            <div style={{ fontWeight: 900, color: '#0f172a' }}>Could not load transactions</div>
            <div style={{ color: '#b91c1c', fontSize: 13, marginTop: 6 }}>{txError}</div>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>
              Make sure backend is running and you are logged in.
            </div>
          </Card>
        ) : transactions.length === 0 ? (
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 900, color: '#0f172a' }}>No transactions yet</div>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
                  Place an order from Cart to see it here.
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 26, lineHeight: 1 }}>🧾</div>
            </div>
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: 12, marginTop: 10 }}>
            {transactions.map((t) => (
              <Card key={t._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ fontWeight: 900, color: '#0f172a' }}>Order #{String(t._id).slice(-8)}</div>
                      {(() => {
                        const st = statusStyles(t.status);
                        return (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 800,
                              padding: '4px 10px',
                              borderRadius: 999,
                              background: st.bg,
                              color: st.fg,
                              border: `1px solid ${st.bd}`,
                            }}
                          >
                            {String(t.status || 'placed').toUpperCase()}
                          </span>
                        );
                      })()}
                    </div>
                    <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>
                      {t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}
                    </div>
                    <div style={{ marginTop: 10 }}>
                      {(t.items || []).slice(0, 3).map((it, idx) => (
                        <div key={idx} style={{ fontSize: 14, color: '#0f172a' }}>
                          <span style={{ fontWeight: 700 }}>{it.name}</span>
                          <span style={{ color: '#64748b' }}> — {it.quantity} kg</span>
                        </div>
                      ))}
                      {(t.items || []).length > 3 ? (
                        <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                          +{(t.items || []).length - 3} more items
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: 140 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: '#0f172a' }}>৳{Number(t.total || 0).toFixed(2)}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Total amount</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 16,
            marginTop: 18,
          }}
        >
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 800 }}>TOTAL USERS</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginTop: 6 }}>120</div>
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(16,185,129,0.20), rgba(6,182,212,0.22))' }}>
                <UsersIcon />
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 800 }}>MONTHLY GROWTH</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginTop: 6 }}>+18%</div>
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(37,99,235,0.20), rgba(168,85,247,0.20))' }}>
                <ChartIcon />
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 800 }}>REVENUE</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginTop: 6 }}>$2,450</div>
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(239,68,68,0.16))' }}>
                <MoneyIcon />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
