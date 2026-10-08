import axios from "axios";

// This frontend is intentionally locked to demo mode. Every Axios request is
// answered locally by this adapter; no request is sent to the real API.
export const DEMO_MODE = true;

export const DEMO_CREDENTIALS = {
  partner: { email: "partner@sample.test", password: "demo1234" },
  admin: { email: "shipmate2134@gmail.com", password: "12345678" },
};

const deepCopy = (value) => structuredClone(value);
const dayMs = 24 * 60 * 60 * 1000;
const daysAgo = (days) => new Date(Date.now() - days * dayMs).toISOString();
const dateDaysAgo = (days) => daysAgo(days).slice(0, 10);

const partnerAccount = {
  id: 101,
  username: "Cedar Ridge Memorial Care",
  email: DEMO_CREDENTIALS.partner.email,
  phone: "(555) 010-0101",
  role: "partner",
  accountRole: "client_admin",
  clientAccountId: 31,
  status: "active",
  mustChangePassword: false,
};

const adminAccount = {
  id: 901,
  username: "Demo Administrator",
  email: DEMO_CREDENTIALS.admin.email,
  role: "super_admin",
};

const clients = [
  {
    id: 31,
    name: "Cedar Ridge Memorial Care",
    requestPhotosRequired: false,
    accountsPayableEmail: "ap@cedarridge.sample.test",
    familyAdvisorPriceVisibility: "none",
    clientAdminPriceVisibility: "restoration",
    locations: [
      { id: 301, name: "Cedar Grove Memorial Park", city: "Maple Falls", state: "WA", status: "active" },
      { id: 302, name: "Pine Meadow Cemetery", city: "Evergreen", state: "WA", status: "active" },
    ],
  },
  {
    id: 32,
    name: "Silver Pine Restoration Group",
    requestPhotosRequired: true,
    accountsPayableEmail: "billing@silverpine.sample.test",
    familyAdvisorPriceVisibility: "customer_retail",
    clientAdminPriceVisibility: "restoration",
    locations: [
      { id: 321, name: "Riverbend Memorial Gardens", city: "Summit", state: "OR", status: "active" },
    ],
  },
];

const packages = [
  { id: 1, name: "Essential Restoration", key: "essential-restoration" },
  { id: 2, name: "Complete Memorial Care", key: "complete-memorial-care" },
  { id: 3, name: "Monument Reset", key: "monument-reset" },
  { id: 4, name: "Memorial Preventative Care Plan", key: "memorial-preventative-care-plan" },
  { id: 5, name: "Premium Memorial Preventative Care Plan", key: "premium-memorial-preventative-care-plan" },
];

let pricingRows = [
  {
    id: 701,
    clientAccountId: 31,
    locationId: 301,
    packageId: 1,
    restorationPrice: "425.00",
    revenueShare: "85.00",
    effectiveDate: dateDaysAgo(90),
  },
  {
    id: 702,
    clientAccountId: 31,
    locationId: 301,
    packageId: 2,
    restorationPrice: "685.00",
    revenueShare: "125.00",
    effectiveDate: dateDaysAgo(90),
  },
  {
    id: 703,
    clientAccountId: 31,
    locationId: 302,
    packageId: 1,
    restorationPrice: "395.00",
    revenueShare: "75.00",
    effectiveDate: dateDaysAgo(60),
  },
  {
    id: 704,
    clientAccountId: 32,
    locationId: 321,
    packageId: 3,
    restorationPrice: "525.00",
    revenueShare: "100.00",
    effectiveDate: dateDaysAgo(40),
  },
  {
    id: 705,
    clientAccountId: 31,
    locationId: 301,
    packageId: 4,
    restorationPrice: "549.00",
    revenueShare: "0.00",
    effectiveDate: dateDaysAgo(0),
  },
  {
    id: 706,
    clientAccountId: 31,
    locationId: 301,
    packageId: 5,
    restorationPrice: "749.00",
    revenueShare: "0.00",
    effectiveDate: dateDaysAgo(0),
  },
  {
    id: 707,
    clientAccountId: 31,
    locationId: 302,
    packageId: 4,
    restorationPrice: "549.00",
    revenueShare: "0.00",
    effectiveDate: dateDaysAgo(0),
  },
  {
    id: 708,
    clientAccountId: 31,
    locationId: 302,
    packageId: 5,
    restorationPrice: "749.00",
    revenueShare: "0.00",
    effectiveDate: dateDaysAgo(0),
  },
];

const teamPartner = {
  id: 102,
  username: "Taylor Quinn",
  email: "taylor.quinn@sample.test",
  accountRole: "family_advisor",
  status: "active",
};

let partners = [
  {
    ...partnerAccount,
    createdAt: daysAgo(120),
    partnershipSettings: {
      annualGoal: 120,
      emailRemindersEnabled: true,
      emailSendTime: "07:00",
    },
  },
  {
    ...teamPartner,
    role: "partner",
    clientAccountId: 31,
    createdAt: daysAgo(80),
    partnershipSettings: { emailRemindersEnabled: true },
  },
  {
    id: 103,
    username: "Morgan Lee",
    email: "morgan.lee@sample.test",
    accountRole: "family_advisor",
    role: "partner",
    clientAccountId: 32,
    status: "pending_approval",
    createdAt: daysAgo(4),
    partnershipSettings: { emailRemindersEnabled: false },
  },
];

let partnerTeamMembers = [
  {
    id: 601,
    partner_id: teamPartner.id,
    partnerId: teamPartner.id,
    request_type: "invite",
    requestType: "invite",
    status: "approved",
    createdAt: daysAgo(45),
    partner: deepCopy(teamPartner),
  },
  {
    id: 602,
    partner_id: 103,
    partnerId: 103,
    request_type: "invite",
    requestType: "invite",
    status: "pending",
    createdAt: daysAgo(2),
    partner: deepCopy(partners[2]),
  },
];

let adminTeamMembers = [
  {
    id: 611,
    admin_id: adminAccount.id,
    status: "active",
    createdAt: daysAgo(100),
    admin: {
      id: 902,
      email: "ops.admin@sample.test",
      username: "Operations Admin",
    },
  },
];

const clientFor = (id) => clients.find((client) => client.id === Number(id));
const locationFor = (id) =>
  clients.flatMap((client) => client.locations).find((location) => location.id === Number(id));
const packageFor = (id) => packages.find((item) => item.id === Number(id));

function makeRequest({
  id,
  status,
  days = 1,
  customerName,
  memorialLocation = "Cedar Grove Memorial Park",
  clientAccountId = 31,
  locationId = 301,
  partnerId = 101,
  packageId = 1,
  amount = 425,
  revenueShare = 85,
}) {
  const submittedAt = daysAgo(days);
  const client = clientFor(clientAccountId);
  const property = locationFor(locationId);
  const requestPartner = partnerId === teamPartner.id
    ? teamPartner
    : partners.find((item) => item.id === partnerId) || partnerAccount;
  const pkg = packageFor(packageId);
  const isInvoiced = ["INVOICE_PENDING", "PAYMENT_PENDING", "PENDING_SCHEDULING", "SCHEDULED", "IN_PROGRESS", "COMPLETED"].includes(status);
  const isPaid = ["PENDING_SCHEDULING", "SCHEDULED", "IN_PROGRESS", "COMPLETED"].includes(status);
  const request = {
    id,
    requestNumber: `DEMO-${String(id).slice(-4)}`,
    partnerId,
    submittedByUserId: partnerId,
    clientAccountId,
    locationId,
    status,
    customerName,
    customerPhone: "(555) 010-20" + String(id).slice(-2),
    customerEmail: `family${String(id).slice(-2)}@sample.test`,
    nameOnMemorial: customerName.split(" ").at(-1),
    memorialSize: "24 × 12 inches",
    memorialType: "Granite",
    memorialLocation: property?.name || memorialLocation,
    section: "Garden 3",
    lot: `A-${String(id).slice(-2)}`,
    space: "04",
    vaseInfo: "Bronze vase, left side",
    notes: "Fictional sample request for the client demo.",
    term: "Annual",
    packageId,
    packageNameSnapshot: pkg?.name || "Essential Restoration",
    packageType: pkg?.name || "Essential Restoration",
    package: pkg ? deepCopy(pkg) : null,
    packagePrice: amount,
    customerRetailPrice: amount + 175,
    restorationPrice: amount,
    revenueShare,
    invoiceAmount: amount - revenueShare,
    pricingEffectiveDate: dateDaysAgo(90),
    submittedAt,
    createdAt: submittedAt,
    completedAt: status === "COMPLETED" ? daysAgo(1) : null,
    approvedBy: ["INVOICE_PENDING", "PENDING_SCHEDULING", "SCHEDULED", "IN_PROGRESS", "COMPLETED"].includes(status)
      ? adminAccount.email
      : null,
    approvedAt: isInvoiced ? daysAgo(Math.max(0, days - 1)) : null,
    deniedBy: status === "REJECTED" ? adminAccount.email : null,
    deniedAt: status === "REJECTED" ? daysAgo(0) : null,
    partner: {
      id: requestPartner.id,
      username: requestPartner.username,
      email: requestPartner.email,
      accountRole: requestPartner.accountRole,
    },
    clientAccount: { id: client?.id, name: client?.name },
    location: property ? { id: property.id, name: property.name } : null,
    statusHistory: [
      {
        id: id + 9000,
        fromStatus: null,
        toStatus: status,
        reason: null,
        changedByRole: "client_admin",
        changedByUserId: partnerId,
        createdAt: submittedAt,
      },
    ],
    photos: [],
    documents: [],
    invoice: isInvoiced
      ? {
          id: id + 8000,
          requestId: id,
          invoiceNumber: `DEMO-INV-${String(id).slice(-4)}`,
          amount: amount - 85,
          status: "SENT",
          paymentStatus: isPaid ? "PAID" : "PENDING",
          paidDate: isPaid ? dateDaysAgo(Math.max(0, days - 1)) : null,
        }
      : null,
    workOrder: ["PENDING_SCHEDULING", "SCHEDULED", "IN_PROGRESS", "COMPLETED"].includes(status)
      ? {
          id: id + 7000,
          status: status === "COMPLETED" ? "COMPLETED" : status,
          assignedTechnicianName: status === "COMPLETED" ? "Demo Service Crew" : "",
          internalNotes: "",
          serviceNotes: status === "COMPLETED" ? "Sample service completed successfully." : "",
          completionDetails: status === "COMPLETED" ? "Fictional completion details." : "",
          completionChecklist: status === "COMPLETED"
            ? { serviceCompleted: true, areaRestored: true, finalInspection: true }
            : {},
          schedules: status === "PENDING_SCHEDULING"
            ? []
            : [{
                scheduledDate: dateDaysAgo(-7),
                windowStart: "09:00",
                windowEnd: "12:00",
              }],
        }
      : null,
  };
  return request;
}

let memorialRequests = [
  makeRequest({ id: 4301, status: "SUBMITTED", days: 1, customerName: "Avery Brooks" }),
  makeRequest({ id: 4302, status: "UNDER_REVIEW", days: 3, customerName: "Jamie Parker", partnerId: 102 }),
  makeRequest({ id: 4303, status: "NEEDS_INFORMATION", days: 5, customerName: "Casey Bennett" }),
  makeRequest({ id: 4304, status: "INVOICE_PENDING", days: 6, customerName: "Riley Morgan", amount: 685, packageId: 2 }),
  makeRequest({ id: 4305, status: "PENDING_SCHEDULING", days: 10, customerName: "Drew Ellis", amount: 395, locationId: 302 }),
  makeRequest({ id: 4306, status: "SCHEDULED", days: 13, customerName: "Quinn Harper", partnerId: 102 }),
  makeRequest({ id: 4307, status: "IN_PROGRESS", days: 16, customerName: "Rowan Blake" }),
  makeRequest({ id: 4308, status: "COMPLETED", days: 20, customerName: "Skyler Reed", amount: 685, packageId: 2 }),
  makeRequest({ id: 4309, status: "SUBMITTED", days: 8, customerName: "Emerson Lane", clientAccountId: 32, locationId: 321, partnerId: 103, packageId: 3, amount: 525 }),
  makeRequest({ id: 4310, status: "DRAFT", days: 0, customerName: "Demo Draft" }),
];

let monumentRequests = [
  {
    id: 5101,
    requestNumber: "MSR-DEMO-001",
    partnerId: 101,
    partner: { id: 101, username: partnerAccount.username, email: partnerAccount.email },
    familyFirstName: "Alex",
    familyLastName: "Wells",
    familyPhone: "(555) 010-3101",
    familyEmail: "alex.wells@sample.test",
    cemeteryName: "Cedar Grove Memorial Park",
    cemeteryCity: "Maple Falls",
    cemeteryState: "WA",
    monumentType: "Upright",
    material: "Granite",
    settingRequested: "Foundation + Setting",
    carePackageOption: "care_549",
    status: "under_review",
    scheduledDate: null,
    serviceNotes: "",
    internalNotes: "",
    documents: [],
    statusHistory: [
      { id: 51011, fromStatus: null, toStatus: "new", createdAt: daysAgo(3), changedByRole: "client_admin" },
      { id: 51012, fromStatus: "new", toStatus: "under_review", createdAt: daysAgo(2), changedByRole: "super_admin" },
    ],
    createdAt: daysAgo(3),
  },
  {
    id: 5102,
    requestNumber: "MSR-DEMO-002",
    partnerId: 101,
    partner: { id: 101, username: partnerAccount.username, email: partnerAccount.email },
    familyFirstName: "Jordan",
    familyLastName: "Stone",
    familyPhone: "(555) 010-3102",
    familyEmail: "jordan.stone@sample.test",
    cemeteryName: "Pine Meadow Cemetery",
    cemeteryCity: "Evergreen",
    cemeteryState: "WA",
    monumentType: "Flat Marker",
    material: "Granite",
    settingRequested: "Setting Only",
    carePackageOption: "care_749",
    status: "scheduled",
    scheduledDate: dateDaysAgo(-8),
    serviceNotes: "",
    internalNotes: "Fictional scheduling note.",
    documents: [],
    statusHistory: [
      { id: 51021, fromStatus: null, toStatus: "new", createdAt: daysAgo(10), changedByRole: "client_admin" },
      { id: 51022, fromStatus: "new", toStatus: "scheduled", createdAt: daysAgo(4), changedByRole: "super_admin" },
    ],
    createdAt: daysAgo(10),
  },
  {
    id: 5103,
    requestNumber: "MSR-DEMO-003",
    partnerId: 101,
    partner: { id: 101, username: partnerAccount.username, email: partnerAccount.email },
    familyFirstName: "Cameron",
    familyLastName: "Frost",
    familyPhone: "(555) 010-3103",
    familyEmail: "cameron.frost@sample.test",
    cemeteryName: "Cedar Grove Memorial Park",
    cemeteryCity: "Maple Falls",
    cemeteryState: "WA",
    monumentType: "Bench",
    material: "Granite",
    settingRequested: "Reset Existing Monument",
    carePackageOption: "care_none",
    status: "completed",
    scheduledDate: dateDaysAgo(6),
    serviceNotes: "Fictional example of completed service.",
    internalNotes: "",
    documents: [],
    statusHistory: [
      { id: 51031, fromStatus: null, toStatus: "new", createdAt: daysAgo(16), changedByRole: "client_admin" },
      { id: 51032, fromStatus: "new", toStatus: "scheduled", createdAt: daysAgo(10), changedByRole: "super_admin" },
      { id: 51033, fromStatus: "scheduled", toStatus: "completed", createdAt: daysAgo(6), changedByRole: "super_admin" },
    ],
    createdAt: daysAgo(16),
  },
];

let nextRequestId = 4311;
let nextMonumentId = 5104;
let nextPartnerId = 104;
let nextMemberId = 603;
let nextPricingId = 709;

const settingsByPartnerId = new Map([
  [101, { annualGoal: 120, emailRemindersEnabled: true, emailSendTime: "07:00" }],
  [102, { annualGoal: 80, emailRemindersEnabled: true, emailSendTime: "08:00" }],
  [103, { annualGoal: 60, emailRemindersEnabled: false, emailSendTime: "07:30" }],
]);

function withPricingAssociations(row) {
  return {
    ...row,
    clientAccount: (() => {
      const client = clientFor(row.clientAccountId);
      return client ? { id: client.id, name: client.name } : null;
    })(),
    location: (() => {
      const location = locationFor(row.locationId);
      return location ? { id: location.id, name: location.name } : null;
    })(),
    package: deepCopy(packageFor(row.packageId) || { id: row.packageId, name: "New demo package" }),
  };
}

function readBody(config) {
  const body = config.data;
  if (!body) return {};
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const result = {};
    for (const [key, value] of body.entries()) {
      if (typeof File !== "undefined" && value instanceof File) continue;
      result[key] = value;
    }
    return result;
  }
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function appendHistory(request, toStatus, reason = null, role = "super_admin") {
  const fromStatus = request.status;
  request.status = toStatus;
  request.statusHistory ||= [];
  request.statusHistory.push({
    id: Date.now() + request.statusHistory.length,
    fromStatus,
    toStatus,
    reason,
    changedByRole: role,
    changedByUserId: role === "client_admin" ? partnerAccount.id : adminAccount.id,
    createdAt: new Date().toISOString(),
  });
  if (toStatus === "INVOICE_PENDING" && !request.invoice) {
    request.invoice = {
      id: request.id + 8000,
      requestId: request.id,
      invoiceNumber: `DEMO-INV-${String(request.id).slice(-4)}`,
      amount: request.invoiceAmount,
      status: "SENT",
      paymentStatus: "PENDING",
      paidDate: null,
    };
  }
}

function formDataToObject(body) {
  if (typeof FormData !== "undefined" && body instanceof FormData) return readBody({ data: body });
  return body || {};
}

function createRestorationRequest(body, status = "SUBMITTED") {
  const form = formDataToObject(body);
  const selectedPricing = pricingRows.find((row) => row.id === Number(form.pricingId));
  const location = locationFor(form.locationId || selectedPricing?.locationId);
  const pkg = packageFor(selectedPricing?.packageId);
  const id = nextRequestId++;
  const request = makeRequest({
    id,
    status,
    days: 0,
    customerName: form.customerName || "Demo Sample",
    locationId: location?.id || 301,
    clientAccountId: location?.id === 321 ? 32 : 31,
    partnerId: partnerAccount.id,
    packageId: selectedPricing?.packageId || 1,
    amount: Number(selectedPricing?.restorationPrice || 425),
    revenueShare: Number(selectedPricing?.revenueShare ?? 85),
  });
  request.requestNumber = `DEMO-${String(id).slice(-4)}`;
  request.customerPhone = form.customerPhone || request.customerPhone;
  request.customerEmail = form.customerEmail || request.customerEmail;
  request.nameOnMemorial = form.nameOnMemorial || request.nameOnMemorial;
  request.memorialSize = form.memorialSize || request.memorialSize;
  request.memorialType = form.memorialType || request.memorialType;
  request.section = form.section || request.section;
  request.lot = form.lot || request.lot;
  request.space = form.space || request.space;
  request.vaseInfo = form.vaseInfo || request.vaseInfo;
  request.notes = form.notes || "Fictional demo request submitted in this session.";
  request.package = pkg ? deepCopy(pkg) : request.package;
  request.packageNameSnapshot = pkg?.name || request.packageNameSnapshot;
  request.packageType = pkg?.name || request.packageType;
  request.statusHistory[0].toStatus = status;
  memorialRequests.unshift(request);
  return request;
}

function createMonumentRequest(body) {
  const form = formDataToObject(body);
  const id = nextMonumentId++;
  const request = {
    id,
    requestNumber: `MSR-DEMO-${String(id).slice(-3)}`,
    partnerId: partnerAccount.id,
    partner: { id: partnerAccount.id, username: partnerAccount.username, email: partnerAccount.email },
    familyFirstName: form.familyFirstName || "Demo",
    familyLastName: form.familyLastName || "Family",
    familyPhone: form.familyPhone || "(555) 010-3000",
    familyEmail: form.familyEmail || "family@sample.test",
    cemeteryName: form.cemeteryName || "Cedar Grove Memorial Park",
    cemeteryCity: form.cemeteryCity || "Maple Falls",
    cemeteryState: form.cemeteryState || "WA",
    monumentType: form.monumentType || "Upright",
    material: form.material || "Granite",
    settingRequested: form.settingRequested || "Foundation + Setting",
    carePackageOption: form.carePackageOption || "care_none",
    status: "new",
    scheduledDate: null,
    serviceNotes: form.specialInstructions || "",
    internalNotes: "",
    documents: [],
    statusHistory: [{
      id: Date.now(),
      fromStatus: null,
      toStatus: "new",
      createdAt: new Date().toISOString(),
      changedByRole: "client_admin",
    }],
    createdAt: new Date().toISOString(),
  };
  monumentRequests.unshift(request);
  return request;
}

function normalizeUrl(config) {
  const url = new URL(config.url || "/", window.location.origin);
  let path = url.pathname;
  const apiIndex = path.indexOf("/api/");
  if (apiIndex >= 0) path = path.slice(apiIndex + 4);
  else if (path.endsWith("/api")) path = "/";
  return { path: path.replace(/\/+$/, "") || "/", url };
}

function makeError(config, status, message) {
  const response = {
    data: { message },
    status,
    statusText: status === 401 ? "Unauthorized" : "Demo Error",
    headers: {},
    config,
    request: null,
  };
  const error = new Error(message);
  error.config = config;
  error.response = response;
  error.isAxiosError = true;
  return error;
}

function demoResponse(config, data, status = 200) {
  return {
    data: deepCopy(data),
    status,
    statusText: status === 201 ? "Created" : "OK",
    headers: {},
    config,
    request: null,
  };
}

function getRestorationRequestsForPartner() {
  return memorialRequests.filter((request) =>
    request.clientAccountId === partnerAccount.clientAccountId
    && (request.partnerId === partnerAccount.id || request.status !== "DRAFT")
  );
}

function dispatch(config) {
  const method = (config.method || "get").toUpperCase();
  const { path, url } = normalizeUrl(config);
  const body = readBody(config);

  if (path === "/login" && method === "POST") {
    const email = String(body.email || "").trim().toLowerCase();
    if (email !== DEMO_CREDENTIALS.partner.email || body.password !== DEMO_CREDENTIALS.partner.password) {
      throw makeError(config, 401, "Use the partner demo credentials shown on this page.");
    }
    return {
      token: "demo-partner-session",
      partner: deepCopy(partnerAccount),
      message: "Partner demo session started.",
    };
  }

  if (path === "/admin/login" && method === "POST") {
    const email = String(body.email || "").trim().toLowerCase();
    if (email !== DEMO_CREDENTIALS.admin.email || body.password !== DEMO_CREDENTIALS.admin.password) {
      throw makeError(config, 401, "Use the admin demo credentials shown on this page.");
    }
    return {
      token: "demo-admin-session",
      admin: deepCopy(adminAccount),
      message: "Admin demo session started.",
    };
  }

  if (path === "/request-options" && method === "GET") {
    const client = clientFor(partnerAccount.clientAccountId);
    return {
      properties: deepCopy(client?.locations || []),
      photosRequired: Boolean(client?.requestPhotosRequired),
      priceVisibility: client?.clientAdminPriceVisibility || "restoration",
    };
  }

  if (path === "/available-pricing" && method === "GET") {
    return {
      pricing: pricingRows
        .filter((row) => row.clientAccountId === partnerAccount.clientAccountId)
        .map((row) => ({
          ...deepCopy(row),
          package: deepCopy(packageFor(row.packageId)),
          location: deepCopy(locationFor(row.locationId)),
        })),
    };
  }

  if (path === "/" && method === "GET") {
    return { requests: deepCopy(getRestorationRequestsForPartner()) };
  }

  if (path === "/monument-setting" && method === "GET") {
    return {
      requests: deepCopy(monumentRequests.filter((request) => request.partnerId === partnerAccount.id)),
    };
  }

  if (path === "/monument-setting/create-request" && method === "POST") {
    return {
      message: "Demo request added to this session.",
      request: deepCopy(createMonumentRequest(config.data)),
    };
  }

  if (path === "/create-request" && method === "POST") {
    return {
      message: "Demo request added to this session.",
      request: deepCopy(createRestorationRequest(config.data)),
    };
  }

  const draftSubmitMatch = path.match(/^\/drafts\/(\d+)\/submit$/);
  if (draftSubmitMatch && method === "POST") {
    const draftId = Number(draftSubmitMatch[1]);
    const draft = memorialRequests.find((request) => request.id === draftId);
    if (draft) appendHistory(draft, "SUBMITTED", null, "client_admin");
    return {
      request: deepCopy(draft || createRestorationRequest(config.data)),
      message: "Demo request submitted.",
    };
  }

  if (path === "/getAccount" && method === "GET") {
    return { partner: deepCopy(partnerAccount) };
  }

  if (path === "/update-account" && method === "PUT") {
    if (body.username) partnerAccount.username = body.username;
    if (body.email) partnerAccount.email = body.email;
    return { message: "Demo profile updated for this session.", partner: deepCopy(partnerAccount) };
  }

  if (path === "/password" && method === "PUT") {
    return { message: "Password change simulated. Nothing was saved or sent." };
  }

  if (path === "/register" && method === "POST") {
    return { message: "Demo only: registration was simulated. No account was created or data sent." };
  }

  if (["/reset-password", "/admin/reset-password", "/admin/register"].includes(path) && method === "POST") {
    return { message: "Demo only: this account action was simulated. Nothing was saved or sent." };
  }

  if (path === "/reset-password" && method === "POST") {
    return { message: "Demo only: password reset was simulated. Nothing was saved or sent." };
  }

  if (path === "/partner/me" && method === "GET") {
    return { partner: deepCopy(partnerAccount), accountRole: partnerAccount.accountRole };
  }

  if (path === "/admin/me" && method === "GET") {
    return { admin: deepCopy(adminAccount) };
  }

  if (path === "/partner/team-members" && method === "GET") {
    return { teamMembers: deepCopy(partnerTeamMembers) };
  }

  if (path === "/partner/team-members/invite" && method === "POST") {
    const invited = {
      id: nextPartnerId++,
      username: body.email || "new.advisor@sample.test",
      email: body.email || "new.advisor@sample.test",
      accountRole: body.role || "family_advisor",
      status: "pending_approval",
    };
    const member = {
      id: nextMemberId++,
      partner_id: invited.id,
      partnerId: invited.id,
      request_type: "invite",
      requestType: "invite",
      status: "pending",
      createdAt: new Date().toISOString(),
      partner: invited,
    };
    partners.push({ ...invited, role: "partner", clientAccountId: partnerAccount.clientAccountId, createdAt: member.createdAt });
    partnerTeamMembers.unshift(member);
    return { message: "Demo invitation added for this session.", teamMember: deepCopy(member) };
  }

  const partnerChangeMatch = path.match(/^\/partner\/team-members\/(\d+)\/status-request$/);
  if (partnerChangeMatch && method === "POST") {
    const memberId = Number(partnerChangeMatch[1]);
    return { message: "Demo status request recorded for this session.", id: memberId };
  }

  if (path === "/admin/requests" && method === "GET") {
    const requests = memorialRequests.filter((request) => request.status !== "DRAFT");
    const status = url.searchParams.get("status");
    const clientId = url.searchParams.get("clientId");
    const propertyId = url.searchParams.get("propertyId");
    const filtered = requests.filter((request) =>
      (!status || request.status === status)
      && (!clientId || String(request.clientAccountId) === clientId)
      && (!propertyId || String(request.locationId) === propertyId)
    );
    return { requests: deepCopy(filtered) };
  }

  if (path === "/admin/invoices/payment-confirmation-queue" && method === "GET") {
    const invoices = memorialRequests
      .filter((request) => request.invoice?.paymentStatus === "PENDING")
      .map((request) => ({
        ...deepCopy(request.invoice),
        memorialRequest: deepCopy(request),
      }));
    return { invoices };
  }

  if (path === "/admin/partners" && method === "GET") {
    return { partners: deepCopy(partners) };
  }

  if (path === "/admin/partner-team-members" && method === "GET") {
    return { partnerTeamMembers: deepCopy(partnerTeamMembers) };
  }

  if (path === "/admin/team-members" && method === "GET") {
    return { teamMembers: deepCopy(adminTeamMembers) };
  }

  if (path === "/admin/monument-setting" && method === "GET") {
    return { requests: deepCopy(monumentRequests) };
  }

  if (path === "/admin/pricing" && method === "GET") {
    return {
      accounts: deepCopy(clients),
      packages: deepCopy(packages),
      pricing: pricingRows.map(withPricingAssociations),
    };
  }

  if (path === "/admin/pricing" && method === "POST") {
    let packageId = Number(body.packageId);
    if (!packageId && body.packageName) {
      const found = packages.find((item) => item.name.toLowerCase() === String(body.packageName).toLowerCase());
      packageId = found?.id || Math.max(...packages.map((item) => item.id)) + 1;
      if (!found) packages.push({ id: packageId, name: body.packageName, key: String(body.packageName).toLowerCase().replace(/\W+/g, "-") });
    }
    pricingRows.unshift({
      id: nextPricingId++,
      clientAccountId: Number(body.clientAccountId),
      locationId: Number(body.locationId),
      packageId,
      restorationPrice: Number(body.restorationPrice).toFixed(2),
      revenueShare: Number(body.revenueShare).toFixed(2),
      effectiveDate: body.effectiveDate || dateDaysAgo(0),
    });
    return { message: "Demo pricing saved in memory for this session." };
  }

  const clientSettingMatch = path.match(/^\/admin\/client-accounts\/(\d+)\/(request-settings|accounts-payable|price-visibility)$/);
  if (clientSettingMatch && method === "PATCH") {
    const client = clientFor(clientSettingMatch[1]);
    if (clientSettingMatch[2] === "request-settings") {
      client.requestPhotosRequired = Boolean(body.requestPhotosRequired);
      return { requestPhotosRequired: client.requestPhotosRequired };
    }
    if (clientSettingMatch[2] === "accounts-payable") {
      client.accountsPayableEmail = body.accountsPayableEmail || null;
      return { accountsPayableEmail: client.accountsPayableEmail };
    }
    if (body.familyAdvisorPriceVisibility) client.familyAdvisorPriceVisibility = body.familyAdvisorPriceVisibility;
    if (body.clientAdminPriceVisibility) client.clientAdminPriceVisibility = body.clientAdminPriceVisibility;
    return {
      familyAdvisorPriceVisibility: client.familyAdvisorPriceVisibility,
      clientAdminPriceVisibility: client.clientAdminPriceVisibility,
    };
  }

  const partnerSettingsMatch = path.match(/^\/admin\/partners\/(\d+)\/settings$/);
  if (partnerSettingsMatch && method === "GET") {
    const settings = settingsByPartnerId.get(Number(partnerSettingsMatch[1])) || {
      annualGoal: 100,
      emailRemindersEnabled: true,
      emailSendTime: "07:00",
    };
    return { settings: deepCopy(settings), completedMemorials: memorialRequests.filter((request) => request.status === "COMPLETED").length };
  }
  if (partnerSettingsMatch && method === "PATCH") {
    const id = Number(partnerSettingsMatch[1]);
    const current = settingsByPartnerId.get(id) || {};
    const settings = { ...current, ...body };
    settingsByPartnerId.set(id, settings);
    const partner = partners.find((item) => item.id === id);
    if (partner) partner.partnershipSettings = { ...(partner.partnershipSettings || {}), ...settings };
    return { message: "Demo settings saved for this session.", settings: deepCopy(settings) };
  }

  const partnerStatusMatch = path.match(/^\/admin\/partners\/(\d+)\/(status|approve)$/);
  if (partnerStatusMatch && method === "PATCH") {
    const id = Number(partnerStatusMatch[1]);
    const partner = partners.find((item) => item.id === id);
    if (partner) partner.status = partnerStatusMatch[2] === "approve" ? "active" : (body.status || partner.status);
    return { message: "Demo partner status updated.", partner: deepCopy(partner || { id, ...body }) };
  }

  const adminPartnerMatch = path.match(/^\/admin\/partners\/(\d+)$/);
  if (adminPartnerMatch && method === "PUT") {
    const partner = partners.find((item) => item.id === Number(adminPartnerMatch[1]));
    if (partner) Object.assign(partner, body);
    return { message: "Demo partner updated for this session.", partner: deepCopy(partner || body) };
  }
  if (adminPartnerMatch && method === "DELETE") {
    const id = Number(adminPartnerMatch[1]);
    partners = partners.filter((partner) => partner.id !== id);
    return { message: "Demo partner removed for this session." };
  }

  const teamDecisionMatch = path.match(/^\/admin\/partner-team-members\/(\d+)\/(approve|deny)$/);
  if (teamDecisionMatch && method === "PATCH") {
    const id = Number(teamDecisionMatch[1]);
    const member = partnerTeamMembers.find((item) => item.id === id);
    if (member) member.status = teamDecisionMatch[2] === "approve" ? "approved" : "denied";
    return { message: "Demo family advisor status updated.", partnerTeamMember: deepCopy(member || { id }) };
  }

  if (path === "/admin/team-members/invite" && method === "POST") {
    const member = {
      id: nextMemberId++,
      admin_id: adminAccount.id,
      status: "active",
      createdAt: new Date().toISOString(),
      admin: { id: 903, email: body.email || "invited.admin@sample.test", username: body.email || "Demo Admin" },
    };
    adminTeamMembers.unshift(member);
    return { message: "Demo administrator invitation added in memory.", teamMember: deepCopy(member) };
  }

  const invoicePaymentMatch = path.match(/^\/admin\/invoices\/(\d+)\/confirm-payment$/);
  if (invoicePaymentMatch && method === "PATCH") {
    const invoiceId = Number(invoicePaymentMatch[1]);
    const request = memorialRequests.find((item) => item.invoice?.id === invoiceId);
    if (request?.invoice) {
      request.invoice.paymentStatus = "PAID";
      request.invoice.paidDate = dateDaysAgo(0);
      appendHistory(request, "PENDING_SCHEDULING", "Demo payment confirmation", "super_admin");
    }
    return {
      message: "Demo payment confirmed.",
      request: deepCopy(request || {}),
      invoice: deepCopy(request?.invoice || { id: invoiceId, paymentStatus: "PAID" }),
    };
  }

  const requestReviewMatch = path.match(/^\/admin\/requests\/(\d+)\/review$/);
  if (requestReviewMatch && method === "PATCH") {
    const request = memorialRequests.find((item) => item.id === Number(requestReviewMatch[1]));
    if (request && request.status === "SUBMITTED") appendHistory(request, "UNDER_REVIEW");
    return { message: "Demo request opened for review.", request: deepCopy(request || {}) };
  }

  const requestActionMatch = path.match(/^\/admin\/requests\/(\d+)\/(approve|deny|request-information|status|operations|documents)$/);
  if (requestActionMatch) {
    const id = Number(requestActionMatch[1]);
    const action = requestActionMatch[2];
    const request = memorialRequests.find((item) => item.id === id);

    if (action === "documents" && method === "GET") return { documents: deepCopy(request?.documents || []) };
    if (action === "documents" && method === "POST") {
      const files = typeof FormData !== "undefined" && config.data instanceof FormData
        ? [...config.data.values()].filter((item) => typeof File !== "undefined" && item instanceof File).map((file) => ({
            id: Date.now() + Math.random(),
            originalName: file.name,
            filename: file.name,
            createdAt: new Date().toISOString(),
          }))
        : [];
      if (request) request.documents = [...(request.documents || []), ...files];
      return { files: deepCopy(files), documents: deepCopy(request?.documents || []) };
    }

    if (action === "operations" && method === "PATCH") {
      const operation = body.operation || "schedule";
      const nextStatus = operation === "start" ? "IN_PROGRESS"
        : operation === "complete" ? "COMPLETED"
          : "SCHEDULED";
      if (request) {
        request.workOrder ||= { schedules: [] };
        request.workOrder.assignedTechnicianName = body.technicianName || request.workOrder.assignedTechnicianName || "Demo Service Crew";
        request.workOrder.internalNotes = body.internalNotes || request.workOrder.internalNotes || "";
        request.workOrder.serviceNotes = body.serviceNotes || request.workOrder.serviceNotes || "";
        request.workOrder.completionDetails = body.completionDetails || request.workOrder.completionDetails || "";
        if (body.scheduledDate) {
          request.workOrder.schedules = [{ scheduledDate: body.scheduledDate, windowStart: "09:00", windowEnd: "12:00" }];
        }
        if (operation === "complete") {
          request.workOrder.status = "COMPLETED";
          request.workOrder.completionChecklist = { serviceCompleted: true, areaRestored: true, finalInspection: true };
          request.completedAt = new Date().toISOString();
        }
        appendHistory(request, nextStatus);
      }
      return { message: "Demo operations updated.", request: deepCopy(request || {}) };
    }

    if (request && method === "PATCH") {
      const nextStatus = action === "approve" ? "INVOICE_PENDING"
        : action === "deny" ? "REJECTED"
          : action === "request-information" ? "NEEDS_INFORMATION"
            : body.status || request.status;
      appendHistory(request, nextStatus, body.reason || body.adminNotes || null);
      return { message: "Demo request updated.", request: deepCopy(request) };
    }

    if (action === "documents" && method === "PUT") {
      return { message: "Demo documents updated." };
    }
  }

  const adminRequestMatch = path.match(/^\/admin\/requests\/(\d+)$/);
  if (adminRequestMatch && method === "GET") {
    const request = memorialRequests.find((item) => item.id === Number(adminRequestMatch[1]));
    return request
      ? { request: deepCopy(request) }
      : { request: null };
  }
  if (adminRequestMatch && method === "DELETE") {
    const id = Number(adminRequestMatch[1]);
    memorialRequests = memorialRequests.filter((item) => item.id !== id);
    return { message: "Demo request removed for this session." };
  }

  const monumentCompletionMatch = path.match(/^\/admin\/monument-setting\/(\d+)\/completion-photos$/);
  if (monumentCompletionMatch && method === "POST") {
    return { message: "Demo completion photos were not uploaded or stored." };
  }
  const monumentUpdateMatch = path.match(/^\/admin\/monument-setting\/(\d+)$/);
  if (monumentUpdateMatch && method === "PATCH") {
    const request = monumentRequests.find((item) => item.id === Number(monumentUpdateMatch[1]));
    if (request) {
      Object.assign(request, body);
      request.statusHistory ||= [];
      request.statusHistory.push({
        id: Date.now(),
        fromStatus: request.status,
        toStatus: body.status || request.status,
        createdAt: new Date().toISOString(),
        changedByRole: "super_admin",
      });
    }
    return { message: "Demo monument request updated.", request: deepCopy(request || {}) };
  }

  if (path.startsWith("/files/monument-setting/") && method === "GET") {
    return new Blob(["Demo image placeholder. No client file was loaded."], { type: "text/plain" });
  }

  if (path === "/admin/requests" && method === "POST") {
    return { request: deepCopy(createRestorationRequest(config.data)) };
  }

  return undefined;
}

axios.defaults.adapter = async (config) => {
  try {
    const result = dispatch(config);
    if (result === undefined) {
      throw makeError(
        config,
        501,
        `This action is not available in the local demo (${(config.method || "get").toUpperCase()} ${normalizeUrl(config).path}).`,
      );
    }
    return demoResponse(config, result);
  } catch (error) {
    if (error?.isAxiosError) throw error;
    throw makeError(config, 500, "The local demo could not complete this action.");
  }
};

// Never reuse a real session already present in this browser profile, but keep
// the two known demo sessions across same-origin page navigations.
const storedPartner = (() => {
  try {
    return JSON.parse(window.localStorage.getItem("partner") || "null");
  } catch {
    return null;
  }
})();
if (
  window.localStorage.getItem("token") !== "demo-partner-session"
  || storedPartner?.email !== DEMO_CREDENTIALS.partner.email
) {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("partner");
}

const storedAdmin = (() => {
  try {
    return JSON.parse(window.localStorage.getItem("admin") || "null");
  } catch {
    return null;
  }
})();
if (
  window.localStorage.getItem("adminToken") !== "demo-admin-session"
  || storedAdmin?.email !== DEMO_CREDENTIALS.admin.email
) {
  window.localStorage.removeItem("adminToken");
  window.localStorage.removeItem("admin");
}
