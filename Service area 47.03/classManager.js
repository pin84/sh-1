_partnerAmenity = null
async function partnerAmenity() {
  if (!_partnerAmenity) {
    await svcUtils.loadJs(_path + '/partner/amenity.js');
    svcUtils.loadCssList(['./partner/amenity.css'])
    _partnerAmenity = new PartnerAmenity();
  }
  return _partnerAmenity;
}