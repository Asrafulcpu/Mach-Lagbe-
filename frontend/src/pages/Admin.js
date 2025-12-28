import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Card = ({ children }) => (
  <div
    style={{
      background: 'rgba(255, 255, 255, 0.92)',
      border: '1px solid rgba(148, 163, 184, 0.35)',
      borderRadius: 16,
      boxShadow: '0 10px 30px rgba(2, 6, 23, 0.08)',
      padding: 16,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}
  >
    {children}
  </div>
);

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      borderRadius: 999,
      padding: '8px 12px',
      fontSize: 13,
      fontWeight: 900,
      border: active ? '1px solid rgba(37,99,235,0.35)' : '1px solid rgba(148,163,184,0.45)',
      background: active ? 'rgba(37,99,235,0.10)' : 'rgba(255,255,255,0.75)',
      color: active ? '#1d4ed8' : '#334155',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

const Admin = () => {
  const { user } = useAuth();
  const [tab, setTab] = React.useState('fish');

  const [fish, setFish] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [loadingFish, setLoadingFish] = React.useState(false);
  const [loadingOrders, setLoadingOrders] = React.useState(false);
  const [error, setError] = React.useState('');

  const [fishForm, setFishForm] = React.useState({
    name: '',
    description: '',
    pricePerKg: '',
    category: 'freshwater',
    availability: 'available',
    stock: 0,
    imageUrl: '',
  });
  const [editingFishId, setEditingFishId] = React.useState(null);

  const loadFish = React.useCallback(async () => {
    setError('');
    setLoadingFish(true);
    try {
      const fishService = await import('../services/fishService');
      const res = await fishService.getFishAdmin();
      if (res?.success) setFish(res.data || []);
      else setError(res?.error || 'Failed to load fish');
    } catch (e) {
      setError(e?.error || e?.message || 'Failed to load fish');
    } finally {
      setLoadingFish(false);
    }
  }, []);

  const loadOrders = React.useCallback(async () => {
    setError('');
    setLoadingOrders(true);
    try {
      const ordersService = await import('../services/ordersService');
      const res = await ordersService.getOrders();
      if (res?.success) setOrders(res.orders || []);
      else setError(res?.error || 'Failed to load orders');
    } catch (e) {
      setError(e?.error || e?.message || 'Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  React.useEffect(() => {
    if (tab === 'fish') loadFish();
    if (tab === 'orders') loadOrders();
  }, [tab, loadFish, loadOrders]);

  const resetFishForm = () => {
    setFishForm({
      name: '',
      description: '',
      pricePerKg: '',
      category: 'freshwater',
      availability: 'available',
      stock: 0,
      imageUrl: '',
    });
    setEditingFishId(null);
  };

  const submitFish = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const fishService = await import('../services/fishService');
      const payload = {
        ...fishForm,
        pricePerKg: Number(fishForm.pricePerKg),
        stock: Number(fishForm.stock),
      };

      if (editingFishId) {
        const res = await fishService.updateFish(editingFishId, payload);
        if (!res?.success) throw new Error(res?.error || 'Update failed');
      } else {
        const res = await fishService.createFish(payload);
        if (!res?.success) throw new Error(res?.error || 'Create failed');
      }

      resetFishForm();
      await loadFish();
    } catch (e2) {
      setError(e2?.error || e2?.message || 'Failed to save fish');
    }
  };

  const startEditFish = (f) => {
    setEditingFishId(f._id);
    setFishForm({
      name: f.name || '',
      description: f.description || '',
      pricePerKg: f.pricePerKg ?? '',
      category: f.category || 'freshwater',
      availability: f.availability || 'available',
      stock: f.stock ?? 0,
      imageUrl: f.imageUrl || '',
    });
  };

  const removeFish = async (id) => {
    const ok = window.confirm('Delete this fish?');
    if (!ok) return;
    setError('');
    try {
      const fishService = await import('../services/fishService');
      const res = await fishService.deleteFish(id);
      if (!res?.success) throw new Error(res?.error || 'Delete failed');
      await loadFish();
    } catch (e) {
      setError(e?.error || e?.message || 'Failed to delete fish');
    }
  };

  const updateOrderStatus = async (id, status) => {
    setError('');
    try {
      const ordersService = await import('../services/ordersService');
      const res = await ordersService.updateOrder(id, { status });
      if (!res?.success) throw new Error(res?.error || 'Failed to update order');
      await loadOrders();
    } catch (e) {
      setError(e?.error || e?.message || 'Failed to update order');
    }
  };

  const removeOrder = async (id) => {
    const ok = window.confirm('Delete this order?');
    if (!ok) return;
    setError('');
    try {
      const ordersService = await import('../services/ordersService');
      const res = await ordersService.deleteOrder(id);
      if (!res?.success) throw new Error(res?.error || 'Failed to delete order');
      await loadOrders();
    } catch (e) {
      setError(e?.error || e?.message || 'Failed to delete order');
    }
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
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a' }}>Admin Panel</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Logged in as {user?.name} ({user?.email})</div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <TabButton active={tab === 'fish'} onClick={() => setTab('fish')}>Fish</TabButton>
            <TabButton active={tab === 'orders'} onClick={() => setTab('orders')}>Orders</TabButton>
          </div>
        </div>

        {error ? (
          <div style={{ marginTop: 12, background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)', color: '#b91c1c', padding: 10, borderRadius: 12, fontSize: 13 }}>
            {error}
          </div>
        ) : null}

        {tab === 'fish' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 16 }}>
            <Card>
              <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 16, marginBottom: 10 }}>
                {editingFishId ? 'Edit Fish' : 'Add Fish'}
              </div>
              <form onSubmit={submitFish} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Name</div>
                  <input value={fishForm.name} onChange={(e)=>setFishForm(p=>({...p,name:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }} required />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Description</div>
                  <input value={fishForm.description} onChange={(e)=>setFishForm(p=>({...p,description:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }} />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Price/kg</div>
                  <input type="number" value={fishForm.pricePerKg} onChange={(e)=>setFishForm(p=>({...p,pricePerKg:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }} required />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Stock</div>
                  <input type="number" value={fishForm.stock} onChange={(e)=>setFishForm(p=>({...p,stock:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }} />
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Category</div>
                  <select value={fishForm.category} onChange={(e)=>setFishForm(p=>({...p,category:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }}>
                    <option value="freshwater">freshwater</option>
                    <option value="saltwater">saltwater</option>
                    <option value="shellfish">shellfish</option>
                    <option value="exotic">exotic</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Availability</div>
                  <select value={fishForm.availability} onChange={(e)=>setFishForm(p=>({...p,availability:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }}>
                    <option value="available">available</option>
                    <option value="limited">limited</option>
                    <option value="out_of_stock">out_of_stock</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>Image URL</div>
                  <input value={fishForm.imageUrl} onChange={(e)=>setFishForm(p=>({...p,imageUrl:e.target.value}))} style={{ width:'100%', borderRadius:12, padding:'10px 12px', border:'1px solid rgba(148,163,184,0.45)' }} />
                </div>

                <div style={{ gridColumn: '1 / -1', display:'flex', justifyContent:'flex-end', gap:10 }}>
                  {editingFishId ? (
                    <button type="button" onClick={resetFishForm} style={{ borderRadius:12, padding:'10px 14px', fontWeight:900, border:'1px solid rgba(148,163,184,0.45)', background:'rgba(255,255,255,0.75)', cursor:'pointer' }}>
                      Cancel
                    </button>
                  ) : null}
                  <button type="submit" style={{ borderRadius:12, padding:'10px 14px', fontWeight:900, border:'1px solid rgba(255,255,255,0.25)', color:'#fff', background:'linear-gradient(135deg, #2563eb, #06b6d4)', cursor:'pointer' }}>
                    {editingFishId ? 'Save' : 'Add'}
                  </button>
                </div>
              </form>
            </Card>

            <Card>
              <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 16, marginBottom: 10 }}>Fish List</div>
              {loadingFish ? (
                <div style={{ color:'#64748b' }}>Loading...</div>
              ) : (
                <div style={{ display: 'grid', gap: 10 }}>
                  {fish.map((f) => (
                    <div key={f._id} style={{ display:'flex', justifyContent:'space-between', gap: 12, flexWrap:'wrap', border:'1px solid rgba(148,163,184,0.25)', borderRadius: 14, padding: 12, background:'rgba(255,255,255,0.6)' }}>
                      <div>
                        <div style={{ fontWeight: 900, color:'#0f172a' }}>{f.name} {!f.isActive ? '(inactive)' : ''}</div>
                        <div style={{ fontSize: 13, color:'#64748b' }}>৳{f.pricePerKg} • stock {f.stock} • {f.category} • {f.availability}</div>
                      </div>
                      <div style={{ display:'flex', gap: 8 }}>
                        <button onClick={() => startEditFish(f)} style={{ borderRadius: 12, padding:'8px 10px', fontWeight: 900, border:'1px solid rgba(37,99,235,0.35)', background:'rgba(37,99,235,0.10)', color:'#1d4ed8', cursor:'pointer' }}>Edit</button>
                        <button onClick={() => removeFish(f._id)} style={{ borderRadius: 12, padding:'8px 10px', fontWeight: 900, border:'1px solid rgba(239,68,68,0.35)', background:'rgba(239,68,68,0.10)', color:'#b91c1c', cursor:'pointer' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                  {fish.length === 0 ? <div style={{ color:'#64748b' }}>No fish found</div> : null}
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 16 }}>
            <Card>
              <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 16, marginBottom: 10 }}>Orders</div>
              {loadingOrders ? (
                <div style={{ color:'#64748b' }}>Loading...</div>
              ) : (
                <div style={{ display: 'grid', gap: 10 }}>
                  {orders.map((o) => (
                    <div key={o._id} style={{ border:'1px solid rgba(148,163,184,0.25)', borderRadius: 14, padding: 12, background:'rgba(255,255,255,0.6)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', gap: 12, flexWrap:'wrap' }}>
                        <div>
                          <div style={{ fontWeight: 900, color:'#0f172a' }}>Order #{String(o._id).slice(-8)}</div>
                          <div style={{ fontSize: 13, color:'#64748b' }}>{o.user?.name} • {o.user?.email}</div>
                          <div style={{ fontSize: 12, color:'#64748b', marginTop: 2 }}>{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}</div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontWeight: 900, fontSize: 18, color:'#0f172a' }}>৳{Number(o.total || 0).toFixed(2)}</div>
                          <div style={{ fontSize: 12, color:'#64748b' }}>items: {(o.items || []).length}</div>
                        </div>
                      </div>

                      <div style={{ display:'flex', justifyContent:'space-between', gap: 12, flexWrap:'wrap', alignItems:'center', marginTop: 10 }}>
                        <div style={{ display:'flex', gap: 8, alignItems:'center', flexWrap:'wrap' }}>
                          <div style={{ fontSize: 12, fontWeight: 900, color:'#475569' }}>Status</div>
                          <select
                            value={o.status || 'pending'}
                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                            style={{ borderRadius: 12, padding:'8px 10px', border:'1px solid rgba(148,163,184,0.45)' }}
                          >
                            <option value="pending">pending</option>
                            <option value="processing">processing</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </div>
                        <button onClick={() => removeOrder(o._id)} style={{ borderRadius: 12, padding:'8px 10px', fontWeight: 900, border:'1px solid rgba(239,68,68,0.35)', background:'rgba(239,68,68,0.10)', color:'#b91c1c', cursor:'pointer' }}>Delete Order</button>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 ? <div style={{ color:'#64748b' }}>No orders yet</div> : null}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
