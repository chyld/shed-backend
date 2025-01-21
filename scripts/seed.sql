-- Insert sample sheds
INSERT INTO Shed (
  id, title, description, isNew, isSold, inventoryNumber,
  basePrice, optionsPrice, salePercent, sizeWidth, sizeLength,
  colorRoof, colorSiding, colorTrim, shedType, createdAt
) VALUES
  (
    'clh1234567890',
    'Classic Garden Cabin',
    'Spacious 10x16 cabin perfect for a garden retreat or home office. Features double doors and two windows.',
    1, 0, 'INV-2024-001',
    1000000, 250000, 0, 10, 16,
    'Charcoal Gray', 'White', 'Black',
    'utility',
    datetime('now')
  ),
  (
    'clh1234567891',
    'Deluxe Studio Cabin',
    'Premium 10x20 studio space with large windows and modern design. Perfect for a home office or guest house.',
    0, 1, 'INV-2024-002',
    1500000, 350000, 10, 10, 20,
    'Black', 'Cedar', 'White',
    'loftedbarn',
    datetime('now')
  ),
  (
    'clh1234567892',
    'Large Barn Style Cabin',
    'Spacious 12x24 barn-style cabin with loft space. Ideal for a workshop or small business.',
    1, 0, 'INV-2024-003',
    1100000, 300000, 0, 12, 24,
    'Red', 'Beige', 'White',
    'barn',
    datetime('now')
  ),
  (
    'clh1234567893',
    'Modern A-Frame Cabin',
    'Contemporary 10x20 A-frame design with large front windows and sleeping loft.',
    0, 0, 'INV-2024-004',
    1300000, 280000, 0, 10, 20,
    'Dark Bronze', 'Natural Cedar', 'Black',
    'metal utility',
    datetime('now')
  ),
  (
    'clh1234567894',
    'Craftsman Workshop',
    'Professional 12x20 workspace with extra height and built-in workbenches.',
    1, 0, 'INV-2024-005',
    1250000, 400000, 0, 12, 20,
    'Forest Green', 'Tan', 'White',
    'utility',
    datetime('now')
  ),
  (
    'clh1234567895',
    'Tiny House Cabin',
    'Fully equipped 10x24 tiny house with kitchen and bathroom rough-ins.',
    1, 1, 'INV-2024-006',
    1600000, 450000, 0, 10, 24,
    'Slate Gray', 'White Pine', 'Black',
    'loftedbarn',
    datetime('now')
  ),
  (
    'clh1234567896',
    'Mountain Lodge Cabin',
    'Rustic 12x20 cabin with covered porch and mountain styling.',
    1, 0, 'INV-2024-007',
    1400000, 320000, 5, 12, 20,
    'Brown', 'Log Siding', 'Dark Brown',
    'barn',
    datetime('now')
  ),
  (
    'clh1234567897',
    'Modern Office Pod',
    'Sleek 10x16 home office with contemporary design and built-in desk.',
    0, 0, 'INV-2024-008',
    1150000, 280000, 0, 10, 16,
    'Matte Black', 'Gray', 'White',
    'metal lofted',
    datetime('now')
  ),
  (
    'clh1234567898',
    'Artist Studio Cabin',
    'Light-filled 10x20 studio with north-facing windows for optimal lighting.',
    1, 0, 'INV-2024-009',
    1350000, 300000, 0, 10, 20,
    'White', 'Light Gray', 'Black',
    'loftedbarn',
    datetime('now')
  ),
  (
    'clh1234567899',
    'Homestead Cabin',
    'Traditional 12x24 cabin with full porch and classic styling.',
    0, 1, 'INV-2024-010',
    1450000, 350000, 0, 12, 24,
    'Burgundy', 'Beige', 'White',
    'cabin',
    datetime('now')
  ),
  (
    'clh1234567900',
    'Garden Retreat',
    'Charming 10x16 retreat with butterfly windows and planter boxes.',
    1, 0, 'INV-2024-011',
    950000, 200000, 0, 10, 16,
    'Green', 'White', 'Green',
    'garden',
    datetime('now')
  ),
  (
    'clh1234567901',
    'Lakeside Cabin',
    'Waterfront-style 10x20 cabin with extra windows and deck support.',
    1, 0, 'INV-2024-012',
    1300000, 400000, 0, 10, 20,
    'Navy Blue', 'White', 'Navy',
    'cabin',
    datetime('now')
  ),
  (
    'clh1234567902',
    'Writer''s Haven',
    'Cozy 10x16 cabin perfect for focusing on your next novel.',
    1, 0, 'INV-2024-013',
    1100000, 250000, 0, 10, 16,
    'Dark Gray', 'Cedar', 'White',
    'loftedbarn',
    datetime('now')
  ),
  (
    'clh1234567903',
    'Modern Barn',
    'Contemporary 12x24 barn design with industrial elements.',
    1, 0, 'INV-2024-014',
    1400000, 350000, 0, 12, 24,
    'Black', 'Metal Gray', 'Black',
    'barn',
    datetime('now')
  ),
  (
    'clh1234567904',
    'Weekend Getaway',
    'Versatile 10x20 cabin for weekend escapes and holiday gatherings.',
    1, 0, 'INV-2024-015',
    1250000, 300000, 0, 10, 20,
    'Brown', 'Natural Wood', 'White',
    'cabin',
    datetime('now')
  ),
  (
    'clh1234567905',
    'Craftsman Studio',
    'Elegant 12x20 space with built-in storage and workbenches.',
    1, 0, 'INV-2024-016',
    1350000, 400000, 0, 12, 20,
    'Dark Green', 'Tan', 'Brown',
    'loftedbarn',
    datetime('now')
  ),
  (
    'clh1234567906',
    'Nordic Retreat',
    'Scandinavian-inspired 10x16 design with minimal aesthetics.',
    1, 0, 'INV-2024-017',
    1200000, 280000, 0, 10, 16,
    'Light Gray', 'White', 'Black',
    'modern',
    datetime('now')
  ),
  (
    'clh1234567907',
    'Rustic Hideaway',
    'Cozy 10x20 cabin with rustic finishes and covered entry.',
    1, 0, 'INV-2024-018',
    1300000, 320000, 0, 10, 20,
    'Rustic Brown', 'Log Siding', 'Brown',
    'cabin',
    datetime('now')
  ),
  (
    'clh1234567908',
    'Modern Minimalist',
    'Clean-lined 12x24 design focusing on simplicity and function.',
    1, 0, 'INV-2024-019',
    1450000, 350000, 0, 12, 24,
    'White', 'Gray', 'Black',
    'modern',
    datetime('now')
  ),
  (
    'clh1234567909',
    'Coastal Cottage',
    'Beach-inspired 10x20 design with nautical elements.',
    1, 0, 'INV-2024-020',
    1250000, 300000, 0, 10, 20,
    'Light Blue', 'White', 'Navy',
    'cottage',
    datetime('now')
  ),
  (
    'clh1234567910',
    'Urban Office',
    'Metropolitan 10x16 workspace with modern amenities.',
    1, 0, 'INV-2024-021',
    1150000, 280000, 0, 10, 16,
    'Charcoal', 'Light Gray', 'White',
    'metal lofted',
    datetime('now')
  ),
  (
    'clh1234567911',
    'Mountain View',
    'Alpine-inspired 12x20 cabin with panoramic windows.',
    1, 0, 'INV-2024-022',
    1400000, 350000, 0, 12, 20,
    'Forest Green', 'Cedar', 'Black',
    'cabin',
    datetime('now')
  ),
  (
    'clh1234567912',
    'Desert Oasis',
    'Southwest-styled 10x20 retreat with climate considerations.',
    1, 0, 'INV-2024-023',
    1300000, 320000, 0, 10, 20,
    'Terra Cotta', 'Adobe', 'Brown',
    'modern',
    datetime('now')
  ),
  (
    'clh1234567913',
    'Woodland Studio',
    'Nature-inspired 10x16 workspace with large windows.',
    1, 0, 'INV-2024-024',
    1100000, 250000, 0, 10, 16,
    'Green', 'Natural Wood', 'Brown',
    'loftedbarn',
    datetime('now')
  ),
  (
    'clh1234567914',
    'Heritage Barn',
    'Traditional 12x24 barn design with modern amenities.',
    1, 0, 'INV-2024-025',
    1400000, 350000, 0, 12, 24,
    'Classic Red', 'White', 'Black',
    'barn',
    datetime('now')
  ),
  (
    'clh1234567915',
    'Prairie Style',
    'Frank Lloyd Wright inspired 10x20 design with horizontal emphasis.',
    1, 0, 'INV-2024-026',
    1350000, 300000, 0, 10, 20,
    'Earth Brown', 'Tan', 'Dark Brown',
    'modern',
    datetime('now')
  ),
  (
    'clh1234567916',
    'Tech Office',
    'Smart-enabled 10x16 office space with modern connectivity.',
    1, 0, 'INV-2024-027',
    1200000, 400000, 0, 10, 16,
    'Silver', 'White', 'Black',
    'metal lofted',
    datetime('now')
  ),
  (
    'clh1234567917',
    'Vintage Workshop',
    'Classic 12x20 workshop with traditional styling.',
    1, 0, 'INV-2024-028',
    1300000, 350000, 0, 12, 20,
    'Dark Red', 'Beige', 'White',
    'utility',
    datetime('now')
  ),
  (
    'clh1234567918',
    'Forest Retreat',
    'Nature-focused 10x24 cabin with sustainable features.',
    1, 0, 'INV-2024-029',
    1450000, 320000, 0, 10, 24,
    'Forest Green', 'Cedar', 'Brown',
    'cabin',
    datetime('now')
  ),
  (
    'clh1234567919',
    'Contemporary Studio',
    'Modern 10x20 studio with clean lines and ample natural light.',
    1, 0, 'INV-2024-030',
    1250000, 300000, 0, 10, 20,
    'Slate', 'White', 'Black',
    'loftedbarn',
    datetime('now')
  );

-- Insert sample trailers
INSERT INTO Trailer (
  id, title, description, isNew, isSold, modelNumber,
  plateNumber, vin, price, salePercent, sizeWidth, sizeLength,
  trailerType, createdAt
) VALUES
  (
    'clt1234567890',
    'Utility Trailer 5x8',
    'Versatile utility trailer perfect for small loads and weekend projects. Features steel construction and treated wood floor.',
    1, 0, 'UT-5X8-2024',
    'ABC1234', '1HGCM82633A123456',
    299500, 0, 5, 8,
    'utility',
    datetime('now')
  ),
  (
    'clt1234567891',
    'Car Hauler 7x16',
    'Heavy-duty car hauler with reinforced frame and diamond plate steel deck.',
    1, 0, 'CH-7X16-2024',
    'XYZ5678', '2HGCM82633B123457',
    549900, 0, 7, 16,
    'car hauler',
    datetime('now')
  ),
  (
    'clt1234567892',
    'Dump Trailer 6x10',
    'Hydraulic dump trailer with dual rams and barn doors. Perfect for landscaping.',
    1, 0, 'DT-6X10-2024',
    'DEF9012', '3HGCM82633C123458',
    649900, 5, 6, 10,
    'dump',
    datetime('now')
  ),
  (
    'clt1234567893',
    'Equipment Trailer 7x20',
    'Heavy equipment trailer with fold-down ramps and 14,000 lb capacity.',
    0, 0, 'ET-7X20-2024',
    'GHI3456', '4HGCM82633D123459',
    749900, 0, 7, 20,
    'equipment',
    datetime('now')
  ),
  (
    'clt1234567894',
    'Enclosed Cargo 6x12',
    'Enclosed cargo trailer with side door and LED lighting. Perfect for business use.',
    1, 0, 'EC-6X12-2024',
    'JKL7890', '5HGCM82633E123460',
    499900, 0, 6, 12,
    'enclosed',
    datetime('now')
  ),
  (
    'clt1234567895',
    'Landscape Trailer 6x14',
    'Open landscape trailer with fold-down gate and rail-top sides.',
    1, 0, 'LT-6X14-2024',
    'MNO1234', '6HGCM82633F123461',
    399900, 0, 6, 14,
    'landscape',
    datetime('now')
  ),
  (
    'clt1234567896',
    'Gooseneck Trailer 8x25',
    'Heavy-duty gooseneck trailer with hydraulic dovetail and 25,000 lb capacity.',
    1, 0, 'GN-8X25-2024',
    'PQR5678', '7HGCM82633G123462',
    1299900, 0, 8, 25,
    'gooseneck',
    datetime('now')
  ),
  (
    'clt1234567897',
    'ATV Trailer 5x10',
    'Compact ATV/UTV trailer with fold-down gate and tie-down points.',
    1, 0, 'AT-5X10-2024',
    'STU9012', '8HGCM82633H123463',
    349900, 0, 5, 10,
    'atv',
    datetime('now')
  ),
  (
    'clt1234567898',
    'Tilt Deck 7x18',
    'Hydraulic tilt deck trailer for easy loading of low-clearance vehicles.',
    1, 0, 'TD-7X18-2024',
    'VWX3456', '9HGCM82633I123464',
    849900, 10, 7, 18,
    'tilt',
    datetime('now')
  ),
  (
    'clt1234567899',
    'Flatbed Trailer 8x20',
    'Heavy-duty flatbed with stake pockets and treated wood deck.',
    1, 0, 'FB-8X20-2024',
    'YZA7890', '0HGCM82633J123465',
    699900, 0, 8, 20,
    'flatbed',
    datetime('now')
  );
