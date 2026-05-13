"use client";

import { useState, useRef, useCallback } from "react";
import {
  Trash2,
  Upload,
  Plus,
  Edit2,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  Camera,
  Users,
} from "lucide-react";
import { funeralDirectors, type GalleryPhoto, type TeamMember, type PhotoCategory } from "@/lib/data";

const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  chapel: "Chapel / Service Room",
  reception: "Reception / Waiting Area",
  vehicles: "Vehicles",
  exterior: "Exterior / Grounds",
  team: "Team Photo",
};

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [PhotoCategory, string][];

const inputStyle = {
  background: "white",
  border: "1px solid #E8E2D8",
  borderRadius: "8px",
  padding: "10px 14px",
  fontSize: "14px",
  color: "#111827",
  width: "100%",
  outline: "none",
};

const MAX_PHOTOS = 12;
const MAX_TEAM = 20;

interface PendingPhoto {
  previewUrl: string;
  category: PhotoCategory;
  caption: string;
}

type MemberFormData = {
  name: string;
  title: string;
  bio: string;
  yearsExp: string;
  photoUrl: string;
};

const EMPTY_MEMBER_FORM: MemberFormData = { name: "", title: "", bio: "", yearsExp: "", photoUrl: "" };

const fd001 = funeralDirectors.find((f) => f.id === "fd_001")!;

export default function GalleryTeamManager() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(fd001.gallery ?? []);
  const [team, setTeam] = useState<TeamMember[]>(fd001.team ?? []);

  // Gallery state
  const [pendingPhoto, setPendingPhoto] = useState<PendingPhoto | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Team state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingMember, setAddingMember] = useState(false);
  const [memberForm, setMemberForm] = useState<MemberFormData>(EMPTY_MEMBER_FORM);
  const [memberPhotoPreview, setMemberPhotoPreview] = useState<string | null>(null);
  const memberPhotoRef = useRef<HTMLInputElement>(null);

  // --- Gallery handlers ---
  const readFile = useCallback((file: File, onResult: (url: string) => void) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onResult(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    readFile(file, (url) => setPendingPhoto({ previewUrl: url, category: "chapel", caption: "" }));
  };

  const handlePhotoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file, (url) => setPendingPhoto({ previewUrl: url, category: "chapel", caption: "" }));
    e.target.value = "";
  };

  const confirmAddPhoto = () => {
    if (!pendingPhoto) return;
    const newPhoto: GalleryPhoto = {
      id: `photo_${Date.now()}`,
      url: pendingPhoto.previewUrl,
      category: pendingPhoto.category,
      caption: pendingPhoto.caption.trim() || undefined,
      order: photos.length + 1,
    };
    setPhotos((prev) => [...prev, newPhoto]);
    setPendingPhoto(null);
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id).map((p, i) => ({ ...p, order: i + 1 })));
  };

  // --- Team handlers ---
  const handleMemberPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file, setMemberPhotoPreview);
    e.target.value = "";
  };

  const openAddMember = () => {
    setAddingMember(true);
    setEditingId(null);
    setMemberForm(EMPTY_MEMBER_FORM);
    setMemberPhotoPreview(null);
  };

  const openEditMember = (member: TeamMember) => {
    setEditingId(member.id);
    setAddingMember(false);
    setMemberForm({
      name: member.name,
      title: member.title,
      bio: member.bio,
      yearsExp: member.yearsExp?.toString() ?? "",
      photoUrl: member.photoUrl,
    });
    setMemberPhotoPreview(null);
  };

  const cancelMemberForm = () => {
    setAddingMember(false);
    setEditingId(null);
    setMemberForm(EMPTY_MEMBER_FORM);
    setMemberPhotoPreview(null);
  };

  const saveMember = () => {
    if (!memberForm.name.trim() || !memberForm.title.trim()) return;
    const photoUrl = memberPhotoPreview || memberForm.photoUrl || `https://picsum.photos/seed/${encodeURIComponent(memberForm.name)}/200/200`;

    if (editingId) {
      setTeam((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? {
                ...m,
                name: memberForm.name.trim(),
                title: memberForm.title.trim(),
                bio: memberForm.bio.trim(),
                yearsExp: memberForm.yearsExp ? parseInt(memberForm.yearsExp) : undefined,
                photoUrl,
              }
            : m
        )
      );
    } else {
      const newMember: TeamMember = {
        id: `team_${Date.now()}`,
        name: memberForm.name.trim(),
        title: memberForm.title.trim(),
        bio: memberForm.bio.trim(),
        yearsExp: memberForm.yearsExp ? parseInt(memberForm.yearsExp) : undefined,
        photoUrl,
        order: team.length + 1,
      };
      setTeam((prev) => [...prev, newMember]);
    }
    cancelMemberForm();
  };

  const deleteMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id).map((m, i) => ({ ...m, order: i + 1 })));
  };

  const moveMember = (id: string, dir: -1 | 1) => {
    setTeam((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((m) => m.id === id);
      const swapIdx = idx + dir;
      if (swapIdx < 0 || swapIdx >= sorted.length) return prev;
      const a = sorted[idx].order;
      const b = sorted[swapIdx].order;
      return prev.map((m) => {
        if (m.id === sorted[idx].id) return { ...m, order: b };
        if (m.id === sorted[swapIdx].id) return { ...m, order: a };
        return m;
      });
    });
  };

  const sortedPhotos = [...photos].sort((a, b) => a.order - b.order);
  const sortedTeam = [...team].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      {/* ─── Gallery Section ─── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4" style={{ color: "#1C1F2A" }} aria-hidden="true" />
            <h2 className="text-base font-semibold" style={{ color: "#1C1F2A" }}>
              Photo Gallery
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(94,139,115,0.1)", color: "#1C1F2A" }}
            >
              {photos.length}/{MAX_PHOTOS}
            </span>
          </div>
        </div>
        <p className="text-sm mb-5" style={{ color: "#5F7080" }}>
          Add photos of your premises, vehicles, and team. Families want to see where you work and who they'll be working with.
        </p>

        {/* Existing photos grid */}
        {sortedPhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {sortedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "4/3", background: "rgba(234,242,238,0.3)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || CATEGORY_LABELS[photo.category]}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none"
                    style={{ background: "rgba(220,38,38,0.85)", color: "white" }}
                    aria-label={`Delete photo ${photo.caption || ""}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5" style={{ background: "rgba(0,0,0,0.55)" }}>
                  <p className="text-xs text-white truncate">{CATEGORY_LABELS[photo.category]}</p>
                  {photo.caption && (
                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.65)" }}>{photo.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload area or pending preview */}
        {photos.length < MAX_PHOTOS && (
          <>
            {!pendingPhoto ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handlePhotoDrop}
                onClick={() => photoInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 rounded-xl cursor-pointer transition-colors duration-150"
                style={{
                  border: `2px dashed ${dragOver ? "#1C1F2A" : "#E8E2D8"}`,
                  background: dragOver ? "rgba(94,139,115,0.04)" : "rgba(249,250,251,0.6)",
                  padding: "36px 24px",
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload photo"
                onKeyDown={(e) => e.key === "Enter" && photoInputRef.current?.click()}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(94,139,115,0.1)" }}
                >
                  <Upload className="w-5 h-5" style={{ color: "#1C1F2A" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: "#1C1F2A" }}>
                    Drag and drop a photo, or click to browse
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#5F7080" }}>
                    JPG, PNG or WebP · Max 10MB · {MAX_PHOTOS - photos.length} remaining
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid #E8E2D8" }}
              >
                <div className="flex gap-5 p-5">
                  {/* Preview */}
                  <div
                    className="shrink-0 rounded-lg overflow-hidden"
                    style={{ width: 120, height: 90, background: "rgba(234,242,238,0.3)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pendingPhoto.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  {/* Form */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5A4E44" }}>
                        Category
                      </label>
                      <select
                        value={pendingPhoto.category}
                        onChange={(e) =>
                          setPendingPhoto((p) => p ? { ...p, category: e.target.value as PhotoCategory } : p)
                        }
                        style={inputStyle}
                      >
                        {CATEGORIES.map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5A4E44" }}>
                        Caption <span style={{ color: "#5F7080", fontWeight: 400 }}>(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Our main chapel, seating up to 80 guests"
                        value={pendingPhoto.caption}
                        onChange={(e) => setPendingPhoto((p) => p ? { ...p, caption: e.target.value } : p)}
                        style={inputStyle}
                        maxLength={120}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center justify-end gap-3 px-5 py-3"
                  style={{ borderTop: "1px solid #E8E2D8", background: "#F7F3EE" }}
                >
                  <button
                    onClick={() => setPendingPhoto(null)}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md hover:opacity-75 transition-opacity focus:outline-none min-h-[40px]"
                    style={{ border: "1px solid #E8E2D8", color: "#5F7080" }}
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    onClick={confirmAddPhoto}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity focus:outline-none min-h-[40px]"
                    style={{ background: "#1C1F2A", color: "white" }}
                  >
                    <Check className="w-3.5 h-3.5" />
                    Add photo
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {photos.length >= MAX_PHOTOS && (
          <p className="text-sm text-center py-4" style={{ color: "#5F7080" }}>
            Gallery is full ({MAX_PHOTOS}/{MAX_PHOTOS}). Delete a photo to add a new one.
          </p>
        )}

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoInputChange}
        />
      </section>

      <div style={{ height: "1px", background: "#E8E2D8" }} />

      {/* ─── Team Section ─── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: "#1C1F2A" }} aria-hidden="true" />
            <h2 className="text-base font-semibold" style={{ color: "#1C1F2A" }}>
              Team Members
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(94,139,115,0.1)", color: "#1C1F2A" }}
            >
              {team.length}/{MAX_TEAM}
            </span>
          </div>
          {team.length < MAX_TEAM && !addingMember && !editingId && (
            <button
              onClick={openAddMember}
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity focus:outline-none min-h-[40px]"
              style={{ background: "#1C1F2A", color: "white" }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add member
            </button>
          )}
        </div>
        <p className="text-sm mb-5" style={{ color: "#5F7080" }}>
          Introduce the people families will meet. Personal profiles build trust before the first conversation.
        </p>

        {/* Team member list */}
        {sortedTeam.length > 0 && (
          <div className="space-y-3 mb-6">
            {sortedTeam.map((member, idx) => (
              <div key={member.id}>
                {editingId === member.id ? (
                  <MemberForm
                    form={memberForm}
                    setForm={setMemberForm}
                    photoPreview={memberPhotoPreview}
                    onPhotoChange={handleMemberPhotoChange}
                    photoInputRef={memberPhotoRef}
                    onSave={saveMember}
                    onCancel={cancelMemberForm}
                    isEdit
                  />
                ) : (
                  <div
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{
                      background: "white",
                      border: "1px solid #E8E2D8",
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full overflow-hidden shrink-0"
                      style={{ border: "2px solid rgba(94,139,115,0.2)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#5A4E44" }}>{member.name}</p>
                          <p className="text-xs mt-0.5 font-medium" style={{ color: "#5E8B73" }}>{member.title}</p>
                          {member.yearsExp && (
                            <p className="text-xs mt-0.5" style={{ color: "#5F7080" }}>{member.yearsExp} years experience</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => moveMember(member.id, -1)}
                            disabled={idx === 0}
                            className="w-7 h-7 rounded flex items-center justify-center hover:opacity-75 transition-opacity focus:outline-none disabled:opacity-30"
                            style={{ background: "rgba(234,242,238,0.4)", color: "#1C1F2A" }}
                            aria-label="Move up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveMember(member.id, 1)}
                            disabled={idx === sortedTeam.length - 1}
                            className="w-7 h-7 rounded flex items-center justify-center hover:opacity-75 transition-opacity focus:outline-none disabled:opacity-30"
                            style={{ background: "rgba(234,242,238,0.4)", color: "#1C1F2A" }}
                            aria-label="Move down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditMember(member)}
                            className="w-7 h-7 rounded flex items-center justify-center hover:opacity-75 transition-opacity focus:outline-none"
                            style={{ background: "rgba(94,139,115,0.1)", color: "#1C1F2A" }}
                            aria-label={`Edit ${member.name}`}
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteMember(member.id)}
                            className="w-7 h-7 rounded flex items-center justify-center hover:opacity-75 transition-opacity focus:outline-none"
                            style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}
                            aria-label={`Delete ${member.name}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {member.bio && (
                        <p
                          className="text-xs leading-relaxed mt-2 line-clamp-2"
                          style={{ color: "#5F7080" }}
                        >
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add member form */}
        {addingMember && (
          <MemberForm
            form={memberForm}
            setForm={setMemberForm}
            photoPreview={memberPhotoPreview}
            onPhotoChange={handleMemberPhotoChange}
            photoInputRef={memberPhotoRef}
            onSave={saveMember}
            onCancel={cancelMemberForm}
            isEdit={false}
          />
        )}

        {team.length === 0 && !addingMember && (
          <div
            className="flex flex-col items-center justify-center gap-3 rounded-xl py-10"
            style={{ border: "2px dashed #E8E2D8", background: "rgba(249,250,251,0.5)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(94,139,115,0.1)" }}
            >
              <Users className="w-5 h-5" style={{ color: "#1C1F2A" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold" style={{ color: "#1C1F2A" }}>No team members yet</p>
              <p className="text-xs mt-1" style={{ color: "#5F7080" }}>
                Add profiles to help families feel at ease before they call
              </p>
            </div>
            <button
              onClick={openAddMember}
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity focus:outline-none min-h-[40px]"
              style={{ background: "#1C1F2A", color: "white" }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add first team member
            </button>
          </div>
        )}

        <input
          ref={memberPhotoRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleMemberPhotoChange}
        />
      </section>
    </div>
  );
}

// ─── Member form sub-component ───────────────────────────────────────────────

function MemberForm({
  form,
  setForm,
  photoPreview,
  onPhotoChange,
  photoInputRef,
  onSave,
  onCancel,
  isEdit,
}: {
  form: MemberFormData;
  setForm: React.Dispatch<React.SetStateAction<MemberFormData>>;
  photoPreview: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoInputRef: React.RefObject<HTMLInputElement | null>;
  onSave: () => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const displayPhoto = photoPreview || form.photoUrl;
  const canSave = form.name.trim() && form.title.trim();

  return (
    <div
      className="p-5 rounded-xl"
      style={{ border: "1px solid #E8E2D8", background: "white" }}
    >
      <p className="text-sm font-semibold mb-4" style={{ color: "#1C1F2A" }}>
        {isEdit ? "Edit team member" : "Add team member"}
      </p>

      <div className="flex gap-5 flex-col sm:flex-row">
        {/* Photo picker */}
        <div className="shrink-0">
          <button
            onClick={() => photoInputRef.current?.click()}
            className="relative group focus:outline-none"
            aria-label="Upload profile photo"
            type="button"
          >
            <div
              className="w-[100px] h-[100px] rounded-full overflow-hidden"
              style={{ border: "2px solid rgba(94,139,115,0.3)", background: "rgba(234,242,238,0.3)" }}
            >
              {displayPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={displayPhoto} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-7 h-7" style={{ color: "#EAF2EE" }} />
                </div>
              )}
            </div>
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(28,31,42,0.55)" }}
              aria-hidden="true"
            >
              <Upload className="w-5 h-5 text-white" />
            </div>
          </button>
          <p className="text-center text-xs mt-1.5" style={{ color: "#5F7080" }}>Click to upload</p>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5A4E44" }}>
                Full name <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Charles Smith"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                maxLength={80}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5A4E44" }}>
                Job title <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Funeral Director"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                style={inputStyle}
                maxLength={80}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5A4E44" }}>
              Short bio <span style={{ color: "#5F7080", fontWeight: 400 }}>(50–100 words recommended)</span>
            </label>
            <textarea
              rows={3}
              placeholder="A short introduction — background, specialisms, what families can expect..."
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              style={{ ...inputStyle, resize: "vertical" }}
              maxLength={500}
            />
            <p className="text-xs mt-1 text-right" style={{ color: "#5F7080" }}>
              {form.bio.trim().split(/\s+/).filter(Boolean).length} words
            </p>
          </div>

          <div style={{ maxWidth: 160 }}>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#5A4E44" }}>
              Years experience <span style={{ color: "#5F7080", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 12"
              min={0}
              max={60}
              value={form.yearsExp}
              onChange={(e) => setForm((f) => ({ ...f, yearsExp: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-end gap-3 mt-5 pt-4"
        style={{ borderTop: "1px solid #E8E2D8" }}
      >
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md hover:opacity-75 transition-opacity focus:outline-none min-h-[40px]"
          style={{ border: "1px solid #E8E2D8", color: "#5F7080" }}
          type="button"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!canSave}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-md font-semibold transition-opacity focus:outline-none min-h-[40px] disabled:opacity-40"
          style={{ background: "#1C1F2A", color: "white" }}
          type="button"
        >
          <Check className="w-3.5 h-3.5" />
          {isEdit ? "Save changes" : "Add member"}
        </button>
      </div>
    </div>
  );
}
