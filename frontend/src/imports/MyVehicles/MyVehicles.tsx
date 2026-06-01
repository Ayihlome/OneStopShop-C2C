import { Car, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Layout from "@/app/components/Layout";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StatusMessage } from "@/app/components/ui/status-message";
import { Textarea } from "@/app/components/ui/textarea";
import { listVehicles, createVehicle, deleteVehicle } from "@/api/vehicles";

type Vehicle = {
  id: number;
  make: string;
  model: string;
  year_produced?: number;
  license_plate?: string;
  notes?: string;
};

const emptyForm = {
  make: "",
  model: "",
  year: "",
  plate: "",
  notes: "",
};

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("Loading vehicles...");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const resp = await listVehicles();
        setVehicles(resp.data || []);
        setStatus("");
      } catch {
        setStatus("Could not load vehicles. Make sure you are signed in.");
      }
    }
    load();
  }, []);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.make.trim() || !form.model.trim()) {
      setStatus("Make and model are required.");
      return;
    }
    setIsSubmitting(true);
    setStatus("Adding vehicle...");
    try {
      await createVehicle({
        make: form.make,
        model: form.model,
        year_produced: form.year ? Number(form.year) : null,
        license_plate: form.plate || null,
        notes: form.notes || null,
      });
      const resp = await listVehicles();
      setVehicles(resp.data || []);
      setForm(emptyForm);
      setStatus("Vehicle added.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not add vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      setStatus("Vehicle removed.");
    } catch {
      setStatus("Could not delete vehicle.");
    }
  };

  return (
    <Layout className="bg-primary" variant="app">
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Badge className="mb-4 bg-primary text-primary-foreground">
          <Car className="size-3" />
          My vehicles
        </Badge>
        <h1 className="text-4xl font-semibold text-primary-foreground">
          My vehicles
        </h1>
        <p className="mt-3 max-w-2xl text-primary-foreground/80">
          Add the vehicles you use for service requests. Saved vehicles appear
          in the booking form.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            {vehicles.length === 0 && (
              <Card className="rounded-lg bg-card">
                <CardContent className="py-10 text-center">
                  <Car className="mx-auto mb-3 size-8 text-muted-foreground" />
                  <p className="font-medium text-foreground">
                    No vehicles saved yet
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your first vehicle using the form.
                  </p>
                </CardContent>
              </Card>
            )}
            {vehicles.map((vehicle) => (
              <Card className="rounded-lg bg-card" key={vehicle.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {vehicle.make} {vehicle.model}
                    </CardTitle>
                    <Button
                      onClick={() => handleDelete(vehicle.id)}
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                  <CardDescription>
                    {vehicle.year_produced && `${vehicle.year_produced} · `}
                    {vehicle.license_plate || "No plate"}
                  </CardDescription>
                </CardHeader>
                {vehicle.notes && (
                  <CardContent className="pb-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      {vehicle.notes}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <Card className="rounded-lg bg-card h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="size-4" />
                Add a vehicle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAdd}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      onChange={(e) =>
                        setForm((f) => ({ ...f, make: e.target.value }))
                      }
                      placeholder="Toyota"
                      value={form.make}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      onChange={(e) =>
                        setForm((f) => ({ ...f, model: e.target.value }))
                      }
                      placeholder="Corolla"
                      value={form.model}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="year">Year (optional)</Label>
                    <Input
                      id="year"
                      onChange={(e) =>
                        setForm((f) => ({ ...f, year: e.target.value }))
                      }
                      placeholder="2020"
                      type="number"
                      value={form.year}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plate">License plate (optional)</Label>
                    <Input
                      id="plate"
                      onChange={(e) =>
                        setForm((f) => ({ ...f, plate: e.target.value }))
                      }
                      placeholder="ABC 123 GP"
                      value={form.plate}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    placeholder="Any details about this vehicle"
                    value={form.notes}
                  />
                </div>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Adding..." : "Add vehicle"}
                </Button>
              </form>
              {status && <StatusMessage className="mt-3" message={status} />}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
