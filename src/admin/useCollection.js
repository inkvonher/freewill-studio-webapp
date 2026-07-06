import { useCallback, useEffect, useState } from 'react';
import { supabase, supabaseReady } from '../lib/supabase.js';

// Hook genérico de CRUD sobre una tabla de Supabase.
export default function useCollection(table, order = { column: 'created_at', ascending: false }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!supabaseReady) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: err } = await supabase.from(table).select('*').order(order.column, { ascending: order.ascending });
    if (err) setError(err.message);
    setRows(data || []);
    setLoading(false);
  }, [table, order.column, order.ascending]);

  useEffect(() => {
    load();
  }, [load]);

  const insert = async (payload) => {
    const { error: err } = await supabase.from(table).insert(payload);
    if (!err) await load();
    return err;
  };
  const update = async (id, payload) => {
    const { error: err } = await supabase.from(table).update(payload).eq('id', id);
    if (!err) await load();
    return err;
  };
  const remove = async (id) => {
    const { error: err } = await supabase.from(table).delete().eq('id', id);
    if (!err) await load();
    return err;
  };

  return { rows, loading, error, reload: load, insert, update, remove };
}
